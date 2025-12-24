import { useState } from "react";
import axios from "axios";

function App() {

    
    const connectHubspot = () => {
        window.open(
            "https://localhost:7265/auth/hubspot/login?state=test-user",
            "_blank"
        );
        alert("HubSpot login opened");
    };

    const connectSalesforce = () => {
        window.open(
            "https://localhost:7265/auth/salesforce/login?state=test-user",
            "_blank"
        );
        alert("Salesforce login opened");
    };

    const [contact, setContact] = useState({ id: "", firstName: "", lastName: "", email: "" });
    const [company, setCompany] = useState({ id: "", name: "", domain: "" });
    const [deal, setDeal] = useState({ id: "", dealName: "", stage: "", amount: "" });

    const [contactsList, setContactsList] = useState([]);
    const [companiesList, setCompaniesList] = useState([]);
    const [dealsList, setDealsList] = useState([]);

    const pushContact = crm =>
        axios.post(`https://localhost:7265/push/contact?userId=test-user`, { crm, ...contact });

    const updateContact = crm =>
        axios.put(`https://localhost:7265/push/contact?userId=test-user`, { crm, ...contact });

    const pushCompany = crm =>
        axios.post(`https://localhost:7265/push/company?userId=test-user`, { crm, ...company });

    const updateCompany = crm =>
        axios.put(`https://localhost:7265/push/company?userId=test-user`, { crm, ...company });

    const pushDeal = crm =>
        axios.post(`https://localhost:7265/push/deal?userId=test-user`, {
            crm,
            ...deal,
            amount: deal.amount ? Number(deal.amount) : null
        });

    const updateDeal = crm =>
        axios.put(`https://localhost:7265/push/deal?userId=test-user`, {
            crm,
            ...deal,
            amount: deal.amount ? Number(deal.amount) : null
        });

    const pullContacts = async crm => {
        const r = await axios.get(`https://localhost:7265/${crm}/contacts?userId=test-user`);
        setContactsList(r.data);
        alert(`${crm.toUpperCase()} contacts pulled successfully`);
    };

    const pullCompanies = async crm => {
        const r = await axios.get(`https://localhost:7265/${crm}/companies?userId=test-user`);
        setCompaniesList(r.data);
        alert(`${crm.toUpperCase()} companies pulled successfully`);
    };

    const pullDeals = async crm => {
        const r = await axios.get(`https://localhost:7265/${crm}/deals?userId=test-user`);
        setDealsList(r.data);
        alert(`${crm.toUpperCase()} deals pulled successfully`);
    };

    const card = {
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "25px",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.08)"
    };

    const input = {
        padding: "8px",
        width: "50%",
        marginBottom: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc"
    };

    const btn = color => ({
        padding: "8px 14px",
        border: "none",
        cursor: "pointer",
        borderRadius: "6px",
        marginRight: "8px",
        color: "#fff",
        background: color
    });

    return (
        <div style={{ padding: 40, fontFamily: "Arial" }}>

            <h1>CRM Utility Dashboard</h1>

            <div style={{ marginBottom: 30 }}>
                <button style={btn("green")} onClick={connectHubspot}>Connect HubSpot</button>
                <button style={btn("#0070d2")} onClick={connectSalesforce}>Connect Salesforce</button>
            </div>

           
            <div style={card}>
                <h2>Contacts</h2>

                <input style={input} placeholder="ID" value={contact.id}
                    onChange={e => setContact({ ...contact, id: e.target.value })} /><br />

                <input style={input} placeholder="First Name" value={contact.firstName}
                    onChange={e => setContact({ ...contact, firstName: e.target.value })} /><br />

                <input style={input} placeholder="Last Name" value={contact.lastName}
                    onChange={e => setContact({ ...contact, lastName: e.target.value })} /><br />

                <input style={input} placeholder="Email" value={contact.email}
                    onChange={e => setContact({ ...contact, email: e.target.value })} /><br /><br />

                <button style={btn("green")}
                    onClick={() => pushContact("hubspot").then(() => alert(" HubSpot contact created successfully"))}>
                    Create HS
                </button>

                <button style={btn("green")}
                    onClick={() => pushContact("salesforce").then(() => alert(" Salesforce contact created successfully"))}>
                    Create SF
                </button>

                <button style={btn("blue")}
                    onClick={() => updateContact("hubspot").then(() => alert(" HubSpot contact updated successfully"))}>
                    Update HS
                </button>

                <button style={btn("blue")}
                    onClick={() => updateContact("salesforce").then(() => alert(" Salesforce contact updated successfully"))}>
                    Update SF
                </button>

                <button style={btn("#333")} onClick={() => pullContacts("hubspot")}>Pull HS</button>
                <button style={btn("#333")} onClick={() => pullContacts("salesforce")}>Pull SF</button>
            </div>

          
            <div style={card}>
                <h2>Companies</h2>

                <input style={input} placeholder="ID" value={company.id}
                    onChange={e => setCompany({ ...company, id: e.target.value })} /><br />

                <input style={input} placeholder="Company Name" value={company.name}
                    onChange={e => setCompany({ ...company, name: e.target.value })} /><br />

                <input style={input} placeholder="Domain" value={company.domain}
                    onChange={e => setCompany({ ...company, domain: e.target.value })} /><br /><br />

                <button style={btn("green")}
                    onClick={() => pushCompany("hubspot").then(() => alert(" HubSpot company created successfully"))}>
                    Create HS
                </button>

                <button style={btn("green")}
                    onClick={() => pushCompany("salesforce").then(() => alert(" Salesforce company created successfully"))}>
                    Create SF
                </button>

                <button style={btn("blue")}
                    onClick={() => updateCompany("hubspot").then(() => alert(" HubSpot company updated successfully"))}>
                    Update HS
                </button>

                <button style={btn("blue")}
                    onClick={() => updateCompany("salesforce").then(() => alert(" Salesforce company updated successfully"))}>
                    Update SF
                </button>

                <button style={btn("#333")} onClick={() => pullCompanies("hubspot")}>Pull HS</button>
                <button style={btn("#333")} onClick={() => pullCompanies("salesforce")}>Pull SF</button>
            </div>

           
            <div style={card}>
                <h2>Deals</h2>

                <input style={input} placeholder="ID" value={deal.id}
                    onChange={e => setDeal({ ...deal, id: e.target.value })} /><br />

                <input style={input} placeholder="Deal Name" value={deal.dealName}
                    onChange={e => setDeal({ ...deal, dealName: e.target.value })} /><br />

                <input style={input} placeholder="Stage" value={deal.stage}
                    onChange={e => setDeal({ ...deal, stage: e.target.value })} /><br />

                <input style={input} placeholder="Amount" value={deal.amount}
                    onChange={e => setDeal({ ...deal, amount: e.target.value })} /><br /><br />

                <button style={btn("green")}
                    onClick={() => pushDeal("hubspot").then(() => alert(" HubSpot deal created successfully"))}>
                    Create HS
                </button>

                <button style={btn("green")}
                    onClick={() => pushDeal("salesforce").then(() => alert(" Salesforce deal created successfully"))}>
                    Create SF
                </button>

                <button style={btn("blue")}
                    onClick={() => updateDeal("hubspot").then(() => alert(" HubSpot deal updated successfully"))}>
                    Update HS
                </button>

                <button style={btn("blue")}
                    onClick={() => updateDeal("salesforce").then(() => alert(" Salesforce deal updated successfully"))}>
                    Update SF
                </button>

                <button style={btn("#333")} onClick={() => pullDeals("hubspot")}>Pull HS</button>
                <button style={btn("#333")} onClick={() => pullDeals("salesforce")}>Pull SF</button>
            </div>

         
            <h2>Pulled Results</h2>

            {contactsList.length > 0 && (
                <>
                    <h3>Contacts (10)</h3>
                    <table border="1" cellPadding="6">
                        <tbody>
                            {[...contactsList].reverse().slice(0, 10).map((c, i) => (
                                <tr key={i}>
                                    <td>{c.id || c.Id}</td>
                                    <td>{c.firstName || c.FirstName}</td>
                                    <td>{c.lastName || c.LastName}</td>
                                    <td>{c.email || c.Email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {companiesList.length > 0 && (
                <>
                    <h3>Companies ( 10)</h3>
                    <table border="1" cellPadding="6">
                        <tbody>
                            {[...companiesList].reverse().slice(0, 10).map((c, i) => (
                                <tr key={i}>
                                    <td>{c.id || c.Id}</td>
                                    <td>{c.name || c.Name}</td>
                                    <td>{c.domain || c.Domain}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {dealsList.length > 0 && (
                <>
                    <h3>Deals (10)</h3>
                    <table border="1" cellPadding="6">
                        <tbody>
                            {[...dealsList].reverse().slice(0, 10).map((d, i) => (
                                <tr key={i}>
                                    <td>{d.id || d.Id}</td>
                                    <td>{d.dealName || d.DealName}</td>
                                    <td>{d.stage || d.Stage}</td>
                                    <td>{d.amount || d.Amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}


        </div>
    );
}

export default App;
