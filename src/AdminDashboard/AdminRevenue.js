import React, { useEffect, useState } from "react";
import "./AdminRevenue.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaMoneyBillWave,
  FaChartLine,
  FaReceipt,
  FaBarcode,
  FaCalculator,
  FaPrint,
  FaTimes
} from "react-icons/fa";
import {
  ref,
  push,
  onValue,
  remove,
  update
} from "firebase/database";
import * as XLSX from "xlsx";
import { FaFileExcel } from "react-icons/fa";

import { database } from "../firebaseConfig";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function AdminRevenue() {
  const [revenues, setRevenues] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Advanced Walk-in POS Features (2026 Additions)
  const [activeSlip, setActiveSlip] = useState(null); 
  const [isSlipOpen, setIsSlipOpen] = useState(false);
  const [cashTendered, setCashTendered] = useState("");
  const [cashChange, setCashChange] = useState(0);
  const [addTaxTip, setAddTaxTip] = useState("0"); 
  const [staffPin, setStaffPin] = useState("POS-01"); 
  const [discountValue, setDiscountValue] = useState(0); 

  // Dynamic Service options extracted from your real-time database records
  const [dynamicServices, setDynamicServices] = useState([]);

  const [form, setForm] = useState({
    customer: "Walk-In Customer",
    orderId: `IN-${Math.floor(100000 + Math.random() * 900000)}`,
    service: "",
    unitPrice: "0",
    quantity: "1",
    amount: "0", 
    paymentMethod: "Cash",
    status: "Paid",

    notes: ""
  });

  // 1. Read real-time revenue and service data from Firebase
  useEffect(() => {
    const revenueRef = ref(database, "revenues");
    onValue(revenueRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedRevenues = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        setRevenues(loadedRevenues);

        // Extract unique service list dynamically from DB history
        const servicesMap = {};
        loadedRevenues.forEach(item => {
          if (item.service) {
            // Store the most recent unit price recorded for this service in the DB

            const calculatedUnitPrice = item.unitPrice || 
              (parseFloat(item.amount) / (parseInt(item.quantity) || 1)).toFixed(2);
            
            servicesMap[item.service.trim()] = parseFloat(calculatedUnitPrice) || 0;
          }
        });

        const uniqueServices = Object.entries(servicesMap).map(([name, basePrice]) => ({
          name,
          basePrice
        }));

        setDynamicServices(uniqueServices);

        // Set default service in form if empty
        if (uniqueServices.length > 0 && !form.service) {
          setForm(prev => ({
            ...prev,

            service: uniqueServices[0].name,
            unitPrice: uniqueServices[0].basePrice.toString(),
            amount: (uniqueServices[0].basePrice * (parseInt(prev.quantity) || 1)).toFixed(2)
          }));
        }
      } else {
        setRevenues([]);
        setDynamicServices([]);
      }
    });
  }, [form.service]);

  // 2. Recalculates amount dynamically when service, price, or quantity updates
  const handleFormUpdate = (fieldName, value) => {
    const updatedForm = { ...form, [fieldName]: value };

    // Auto-pull dynamic unit price if a recorded service is selected
    if (fieldName === "service") {

      const serviceObj = dynamicServices.find(s => s.name === value);
      if (serviceObj) {
        updatedForm.unitPrice = serviceObj.basePrice.toString();
      }
    }

    // Dynamic Price Calculation (Quantity * Unit Price)
    const qty = parseInt(updatedForm.quantity) || 1;
    const price = parseFloat(updatedForm.unitPrice) || 0;
    const computedTotal = qty * price;
    
    // Apply discount rate (if any)
    const discountFactor = 1 - (discountValue / 100);
    updatedForm.amount = (computedTotal * discountFactor).toFixed(2);
    setForm(updatedForm);
  };

  const handleChange = (e) => {
    handleFormUpdate(e.target.name, e.target.value);
  };

  // Quick discount calculations
  const applyQuickDiscount = (pct) => {
    setDiscountValue(pct);
    const qty = parseInt(form.quantity) || 1;
    const price = parseFloat(form.unitPrice) || 0;
    const total = qty * price * (1 - pct / 100);
    setForm({ ...form, amount: total.toFixed(2) });
  };

  // Dynamic cash register change calculator
  useEffect(() => {
    const totalWithTip = parseFloat(form.amount) * (1 + parseFloat(addTaxTip) / 100);
    const tendered = parseFloat(cashTendered) || 0;
    if (tendered >= totalWithTip) {
      setCashChange(tendered - totalWithTip);
    } else {
      setCashChange(0);
    }

  }, [cashTendered, form.amount, addTaxTip]);

  // 3. Save directly to Firebase Database
  const saveRevenue = () => {
    if (!form.customer || !form.service || !form.amount) {
      return alert("Please complete customer service details.");
    }
    const finalCalculatedAmount = parseFloat(form.amount) * (1 + parseFloat(addTaxTip) / 100);
    const revenueData = {
      ...form,
      amount: finalCalculatedAmount.toFixed(2),
      discountApplied: `${discountValue}%`,
      tipApplied: `${addTaxTip}%`,
      clerkId: staffPin,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    if (editId) {
      update(ref(database, `revenues/${editId}`), revenueData);
      setEditId(null);
    } else {
      push(ref(database, "revenues"), revenueData);
    }

    // Set Receipt Modal view state
    setActiveSlip({
      ...revenueData,
      subtotal: (parseFloat(form.unitPrice) * parseInt(form.quantity)).toFixed(2),
      tenderedAmount: cashTendered || finalCalculatedAmount.toFixed(2),
      changeDue: cashChange.toFixed(2)
    });
    setIsSlipOpen(true);

    // Reset Form to default inputs
    setForm({
      customer: "Walk-In Customer",
      orderId: `IN-${Math.floor(100000 + Math.random() * 900000)}`,
      service: dynamicServices[0]?.name || "",
      unitPrice: dynamicServices[0]?.basePrice.toString() || "0",
      quantity: "1",
      amount: dynamicServices[0]?.basePrice.toString() || "0",
      paymentMethod: "Cash",
      status: "Paid",
      notes: ""
    });
    setCashTendered("");
    setDiscountValue(0);
    setAddTaxTip("0");
  };

  const editRevenue = (item) => {
    setEditId(item.id);
    setForm({
      customer: item.customer,
      orderId: item.orderId || `IN-${Math.floor(100000 + Math.random() * 900000)}`,
      service: item.service,
      unitPrice: item.unitPrice || (parseFloat(item.amount) / (parseInt(item.quantity) || 1)).toFixed(2),
      quantity: (item.quantity || "1").toString(),

      amount: item.amount,
      paymentMethod: item.paymentMethod || "Cash",
      status: item.status || "Paid",
      notes: item.notes || ""
    });
  };

  const deleteRevenue = (id) => {
    if (window.confirm("Delete walk-in record permanently?")) {
      remove(ref(database, `revenues/${id}`));
    }
  };

  const viewReceipt = (item) => {
    setActiveSlip({
      ...item,
      subtotal: (parseFloat(item.unitPrice || item.amount) * parseInt(item.quantity || 1)).toFixed(2),
      tenderedAmount: item.amount,
      changeDue: "0.00"
    });

    setIsSlipOpen(true);
  };

  const filtered = revenues.filter(item => {
    const searchMatch = item.customer.toLowerCase().includes(search.toLowerCase());
    const statusMatch = filter === "All" || item.status === filter;
    return searchMatch && statusMatch;
  });

  const totalRevenue = revenues.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const paidRevenue = revenues.filter(r => r.status === "Paid").reduce((sum, item) => sum + Number(item.amount), 0);
  const pendingRevenue = revenues.filter(r => r.status === "Pending").reduce((sum, item) => sum + Number(item.amount), 0);
  
  const chartData = revenues.map(item => ({
    date: item.date,
    amount: Number(item.amount)

  }));

  const exportRevenueExcel = () => {
    const excelData = revenues.map(item => ({
      "Customer (Walk-In)": item.customer,
      "Slip Number": item.orderId || "-",
      "Service": item.service || "-",
      "Qty": item.quantity || "1",
      "Total Amount": `R ${item.amount}`,
      "Payment Mode": item.paymentMethod,
      "Cashier": item.clerkId || "Admin",
      "Status": item.status,
      "Date": item.date,
      "Time": item.time,
      "Notes": item.notes || "-"
    }));
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Indoor Revenue POS");
    XLSX.writeFile(workbook, "Elsies_Indoor_Purchases_Report.xlsx");
  };


  const printSlipElement = () => {
    window.print();
  };

  return (
    <div className="admin-revenue">
      <section className="revenue-header">
        <h1>Indoors Purchases Management</h1>
        <p>Walk-in POS terminal, instant service billing, cash tracking, and tax slip generation.</p>
      </section>

      {/* STATS OVERVIEW */}
      <section className="revenue-stats">
        <div>
          <FaMoneyBillWave />
          <h2>R {totalRevenue.toFixed(2)}</h2>
          <p>Total Indoor Intake</p>
        </div>
        <div>
          <FaChartLine />
          <h2>R {paidRevenue.toFixed(2)}</h2>
          <p>Paid Slip Settled</p>

        </div>
        <div>
          <FaReceipt />
          <h2>R {pendingRevenue.toFixed(2)}</h2>
          <p>Outstanding Slips</p>
        </div>
      </section>

      {/* POS CONSOLE FORM */}
      <section className="revenue-form">
        <h2>{editId ? "Edit Walk-In Purchase" : "New Indoor Walk-In Purchase"}</h2>
        
        <div className="pos-input-grid">
          <div>
            <label className="pos-label">Customer Reference</label>
            <input
              name="customer"
              placeholder="e.g. Counter Cash Customer"
              value={form.customer}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="pos-label">Generated Slip / ID</label>
            <input
              name="orderId"
              value={form.orderId}
              readOnly
              className="pos-readonly"
            />
          </div>
        </div>

        <div className="pos-input-grid text-left-grid">
          <div>
            <label className="pos-label">Service Rendered (From Live Database)</label>
            <div className="service-selection-wrapper">
              {dynamicServices.length > 0 ? (
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}

                >
                  {dynamicServices.map((s, idx) => (
                    <option key={idx} value={s.name}>
                      {s.name} (R{s.basePrice})
                    </option>
                  ))}
                  <option value="Custom/New Service">-- Type custom service below --</option>
                </select>
              ) : (
                <input
                  name="service"
                  placeholder="Enter new service type..."
                  value={form.service}
                  onChange={handleChange}
                />
              )}
            </div>

            {/* fallback input block if they select Custom/New Service or DB is empty */}
            {(dynamicServices.length === 0 || form.service === "Custom/New Service") && (
              <input

                name="service"
                placeholder="Type new custom service name here..."
                style={{ marginTop: '10px' }}
                onChange={(e) => handleFormUpdate("service", e.target.value)}
              />
            )}
          </div>

          <div className="three-column-subgrid">
            <div>
              <label className="pos-label">Unit Price (R)</label>
              <input
                type="number"
                name="unitPrice"
                value={form.unitPrice}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="pos-label">Quantity</label>

              <input
                type="number"
                name="quantity"
                min="1"
                value={form.quantity}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="pos-label">Net Subtotal</label>
              <input
                type="text"
                name="amount"
                value={`R ${form.amount}`}
                readOnly
                className="pos-readonly-amount"
              />
            </div>
          </div>
        </div>

        {/* PAYMENT SYSTEM */}
        <div className="pos-advanced-wrapper">

          <div className="advanced-column">
            <label className="pos-label">Payment Method</label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
            >
              <option value="Cash">Cash Transaction</option>
              <option value="Bank Card">Bank Card POS Swipe</option>
            </select>
          </div>
          <div className="advanced-column">
            <label className="pos-label">Quick POS Promo Code (%)</label>
            <div className="pos-discount-pills">
              <button type="button" onClick={() => applyQuickDiscount(0)} className={discountValue === 0 ? "active" : ""}>0%</button>
              <button type="button" onClick={() => applyQuickDiscount(5)} className={discountValue === 5 ? "active" : ""}>5%</button>
              <button type="button" onClick={() => applyQuickDiscount(10)} className={discountValue === 10 ? "active" : ""}>10%</button>
              <button type="button" onClick={() => applyQuickDiscount(15)} className={discountValue === 15 ? "active" : ""}>15%</button>
            </div>
          </div>
          <div className="advanced-column">
            <label className="pos-label">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Paid">Fully Paid</option>
              <option value="Pending">Lay-by / Pending</option>
            </select>

          </div>
        </div>

        {form.paymentMethod === "Cash" && (
          <div className="cash-calculator-box">
            <div className="calc-header"><FaCalculator /> Live Drawer Cash Tender Register</div>
            <div className="calc-body">
              <div>
                <label>Cash Tendered by Customer (R)</label>
                <input
                  type="number"
                  placeholder="e.g. 200"
                  value={cashTendered}
                  onChange={(e) => setCashTendered(e.target.value)}
                />
              </div>
              <div className="change-display">
                <span>Change Due:</span>
                <h3>R {cashChange.toFixed(2)}</h3>
              </div>

            </div>
          </div>
        )}

        <div className="pos-clerk-row">
          <div>
            <label className="pos-label">Assigned POS Terminal</label>
            <select value={staffPin} onChange={(e) => setStaffPin(e.target.value)}>
              <option value="POS-01">Station 1 - Back Office Counter</option>
              <option value="POS-02">Station 2 - Front Desk Terminal</option>
              <option value="POS-Mobile">Station 3 - Floor Mobile Tablet</option>
            </select>
          </div>
          <div>
            <label className="pos-label">Add Service Charge / Tip</label>
            <select value={addTaxTip} onChange={(e) => setAddTaxTip(e.target.value)}>
              <option value="0">No Addons (0%)</option>
              <option value="5">Standard Walkin Fee (+5%)</option>
              <option value="10">Express Delivery Order (+10%)</option>
            </select>
          </div>
        </div>

        <textarea
          name="notes"
          placeholder="Add custom notes, custom stitching codes, or customer measurements..."
          value={form.notes}
          onChange={handleChange}
        />

        <div className="pos-action-btn-row">
          <button className="save-pos-btn" onClick={saveRevenue}>
            <FaPlus /> {editId ? "Update Walk-In Sale" : "Process Walk-In Sale & Print"}
          </button>
          <button className="excel-btn" onClick={exportRevenueExcel}>
            <FaFileExcel /> Export Excel Report
          </button>
        </div>
      </section>

      {/* FILTER AND SEARCH BAR */}
      <section className="revenue-tools">
        <div className="search">
          <FaSearch />
          <input
            placeholder="Search by customer name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select onChange={e => setFilter(e.target.value)}>
          <option value="All">All Invoices</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
      </section>

      {/* DATABASE GRID TABLE */}
      <section className="revenue-table">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Qty</th>
              <th>Total Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Slip</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id}>
                <td>{item.customer}</td>
                <td>{item.service}</td>
                <td>{item.quantity || 1}</td>
                <td>R {parseFloat(item.amount).toFixed(2)}</td>
                <td>

                  <span className={`payment-pill ${item.paymentMethod?.replace(" ", "-")}`}>
                    {item.paymentMethod}
                  </span>
                </td>
                <td>
                  <span className={`status-pill ${item.status}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="slip-btn-action" onClick={() => viewReceipt(item)}>
                    <FaReceipt /> View Slip
                  </button>
                </td>
                <td>
                  <button className="row-action-btn edit" onClick={() => editRevenue(item)}>
                    <FaEdit />
                  </button>
                  <button className="row-action-btn delete" onClick={() => deleteRevenue(item.id)}>

                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* GROWTH CHART */}
      <section className="chart">
        <h2>Indoor Purchase Intake Trajectory</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#d4af37" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </section>


      {/* 2026 DIGITAL THERMAL RECEIPT MODAL */}
      {isSlipOpen && activeSlip && (
        <div className="receipt-overlay">
          <div className="receipt-paper" id="print-receipt-element">
            <div className="receipt-header">
              <FaBarcode className="receipt-barcode" />
              <h3>ELSIES PREMIUM WALKIN</h3>
              <p>Indoors Purchases Terminal ({activeSlip.clerkId || "Counter-1"})</p>
              <p className="serial-num">INV: {activeSlip.orderId}</p>
            </div>
            <div className="receipt-body">
              <div className="receipt-row">
                <span>Date: {activeSlip.date}</span>
                <span>Time: {activeSlip.time}</span>
              </div>
              <div className="receipt-divider"></div>
              
              <p className="receipt-cust-name"><strong>Cust:</strong> {activeSlip.customer}</p>
              
              <div className="receipt-divider"></div>
              <div className="receipt-item-line">
                <p className="item-name">{activeSlip.service}</p>
                <div className="item-math">
                  <span>{activeSlip.quantity || 1} units x R{(parseFloat(activeSlip.unitPrice) || (parseFloat(activeSlip.amount) / parseInt(activeSlip.quantity || 1))).toFixed(2)}</span>
                  <span>R {activeSlip.subtotal}</span>
                </div>
              </div>
              {activeSlip.discountApplied && activeSlip.discountApplied !== "0%" && (
                <div className="receipt-row addon-row">
                  <span>Discount ({activeSlip.discountApplied}):</span>
                  <span>-R {((parseFloat(activeSlip.subtotal) * parseFloat(activeSlip.discountApplied)) / 100).toFixed(2)}</span>
                </div>
              )}
              {activeSlip.tipApplied && activeSlip.tipApplied !== "0%" && (
                <div className="receipt-row addon-row">
                  <span>Service Premium Charge ({activeSlip.tipApplied}):</span>
                  <span>+R {((parseFloat(activeSlip.subtotal) * parseFloat(activeSlip.tipApplied)) / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="receipt-divider"></div>
              <div className="receipt-row grand-total-row">
                <span>TOTAL DUE:</span>
                <span>R {parseFloat(activeSlip.amount).toFixed(2)}</span>
              </div>

              <div className="receipt-row billing-meta">
                <span>Payment Method:</span>
                <span>{activeSlip.paymentMethod}</span>
              </div>
              {activeSlip.paymentMethod === "Cash" && (
                <>
                  <div className="receipt-row">
                    <span>Cash Tendered:</span>
                    <span>R {parseFloat(activeSlip.tenderedAmount).toFixed(2)}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Change Returned:</span>
                    <span>R {parseFloat(activeSlip.changeDue).toFixed(2)}</span>
                  </div>
                </>
              )}
              {activeSlip.notes && (

                <div className="receipt-notes">
                  <strong>Notes:</strong> {activeSlip.notes}
                </div>
              )}
            </div>
            <div className="receipt-footer">
              <p>Thank you for choosing Elsies!</p>
              <p>Goods printed to client specification.</p>
              <div className="print-controls-row">
                <button onClick={printSlipElement} className="receipt-print-btn">
                  <FaPrint /> Print Slip
                </button>
                <button onClick={() => setIsSlipOpen(false)} className="receipt-close-btn">
                  <FaTimes /> Close Terminal
                </button>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  );
}

export default AdminRevenue;
