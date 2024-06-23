"use client";
import React from "react";
import SparkasseLoginRegistrationForms from "../components/sparkasse-login-registration-forms";

function MainComponent() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [transactions, setTransactions] = React.useState([]);
  const [amount, setAmount] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const [notifications, setNotifications] = React.useState([]);
  const [profile, setProfile] = React.useState({ fullName: "", email: "" });
  const [showProfile, setShowProfile] = React.useState(false);
  const [contact, setContact] = React.useState({ subject: "", message: "" });
  const [savingsAccounts, setSavingsAccounts] = React.useState([]);
  const [loans, setLoans] = React.useState([]);
  const [showSavingsForm, setShowSavingsForm] = React.useState(false);
  const [savingsAmount, setSavingsAmount] = React.useState("");
  const [showLoanForm, setShowLoanForm] = React.useState(false);
  const [loanAmount, setLoanAmount] = React.useState("");
  const [loanTerm, setLoanTerm] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [showTransferForm, setShowTransferForm] = React.useState(false);
  const [transferAmount, setTransferAmount] = React.useState("");
  const [transferDescription, setTransferDescription] = React.useState("");
  const [transferTo, setTransferTo] = React.useState("");
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showContacts, setShowContacts] = React.useState(false);
  const [investments, setInvestments] = React.useState([]);
  const [showInvestmentForm, setShowInvestmentForm] = React.useState(false);
  const [investmentAmount, setInvestmentAmount] = React.useState("");
  const [investmentDetails, setInvestmentDetails] = React.useState("");

  React.useEffect(() => {
    if (loggedIn) {
      fetch("/api/db/benutzer", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT * FROM `transactions` WHERE `user_id` = ?",
          values: [user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => setTransactions(data));

      fetch("/api/db/benutzer", {
        method: "POST",
        body: JSON.stringify({
          query:
            "SELECT SUM(amount) as balance FROM `transactions` WHERE `user_id` = ?",
          values: [user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => setBalance(data[0].balance));

      fetch("/api/db/benutzer", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT * FROM `notifications` WHERE `user_id` = ?",
          values: [user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => setNotifications(data));

      fetch("/api/db/benutzer", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT `full_name`, `email` FROM `users` WHERE `id` = ?",
          values: [user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => setProfile(data[0]));

      fetch("/api/db/benutzer", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT * FROM `savings_accounts` WHERE `user_id` = ?",
          values: [user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => setSavingsAccounts(data));

      fetch("/api/db/benutzer", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT * FROM `loans` WHERE `user_id` = ?",
          values: [user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => setLoans(data));

      fetch("/api/db/benutzer", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT * FROM `messages` WHERE `user_id` = ?",
          values: [user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => setMessages(data));

      fetch("/api/db/benutzer", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT * FROM `investments` WHERE `user_id` = ?",
          values: [user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => setInvestments(data));
    }
  }, [loggedIn, user]);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/api/db/benutzer", {
      method: "POST",
      body: JSON.stringify({
        query: "SELECT * FROM `users` WHERE `username` = ? AND `password` = ?",
        values: [e.target.username.value, e.target.password.value],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setUser(data[0]);
          setLoggedIn(true);
        }
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("/api/db/benutzer", {
      method: "POST",
      body: JSON.stringify({
        query: "INSERT INTO `users` (username, password) VALUES (?, ?)",
        values: [e.target.username.value, e.target.password.value],
      }),
    }).then(() => {
      handleLogin(e);
    });
  };

  const handleTransaction = (type) => {
    fetch("/api/db/benutzer", {
      method: "POST",
      body: JSON.stringify({
        query:
          "INSERT INTO `transactions` (user_id, type, amount, description) VALUES (?, ?, ?, ?)",
        values: [user.id, type, parseFloat(amount), description],
      }),
    }).then(() => {
      fetch("/api/db/benutzer", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT * FROM `transactions` WHERE `user_id` = ?",
          values: [user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => setTransactions(data));

      fetch("/api/db/benutzer", {
        method: "POST",
        body: JSON.stringify({
          query:
            "SELECT SUM(amount) as balance FROM `transactions` WHERE `user_id` = ?",
          values: [user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => setBalance(data[0].balance));
    });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    fetch("/api/db/benutzer", {
      method: "POST",
      body: JSON.stringify({
        query: "UPDATE `users` SET `full_name` = ?, `email` = ? WHERE `id` = ?",
        values: [profile.fullName, profile.email, user.id],
      }),
    }).then(() => {
      setShowProfile(false);
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    fetch("/api/db/benutzer", {
      method: "POST",
      body: JSON.stringify({
        query:
          "INSERT INTO `contacts` (user_id, subject, message) VALUES (?, ?, ?)",
        values: [user.id, contact.subject, contact.message],
      }),
    }).then(() => {
      setContact({ subject: "", message: "" });
    });
  };

  const handleSavingsSubmit = () => {
    fetch("/api/db/benutzer", {
      method: "POST",
      body: JSON.stringify({
        query: "INSERT INTO `savings_accounts` (user_id, amount) VALUES (?, ?)",
        values: [user.id, parseFloat(savingsAmount)],
      }),
    }).then(() => {
      setShowSavingsForm(false);
      setSavingsAmount("");
      fetch("/api/db/benutzer", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT * FROM `savings_accounts` WHERE `user_id` = ?",
          values: [user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => setSavingsAccounts(data));
    });
  };

  const handleLoanSubmit = () => {
    fetch("/api/db/benutzer", {
      method: "POST",
      body: JSON.stringify({
        query: "INSERT INTO `loans` (user_id, amount, term) VALUES (?, ?, ?)",
        values: [user.id, parseFloat(loanAmount), parseInt(loanTerm)],
      }),
    }).then(() => {
      setShowLoanForm(false);
      setLoanAmount("");
      setLoanTerm("");
      fetch("/api/db/benutzer", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT * FROM `loans` WHERE `user_id` = ?",
          values: [user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => setLoans(data));
    });
  };

  const handleTransferSubmit = () => {
    fetch("/api/db/benutzer", {
      method: "POST",
      body: JSON.stringify({
        query:
          "INSERT INTO `transactions` (user_id, type, amount, description, transfer_to) VALUES (?, ?, ?, ?, ?)",
        values: [
          user.id,
          "transfer",
          parseFloat(transferAmount),
          transferDescription,
          transferTo,
        ],
      }),
    }).then(() => {
      setShowTransferForm(false);
      setTransferAmount("");
      setTransferDescription("");
      setTransferTo("");
      fetch("/api/db/benutzer", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT * FROM `transactions` WHERE `user_id` = ?",
          values: [user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => setTransactions(data));
    });
  };

  const handleInvestmentSubmit = () => {
    fetch("/api/db/benutzer", {
      method: "POST",
      body: JSON.stringify({
        query:
          "INSERT INTO `investments` (user_id, amount, details) VALUES (?, ?, ?)",
        values: [user.id, parseFloat(investmentAmount), investmentDetails],
      }),
    }).then(() => {
      setShowInvestmentForm(false);
      setInvestmentAmount("");
      setInvestmentDetails("");
      fetch("/api/db/benutzer", {
        method: "POST",
        body: JSON.stringify({
          query: "SELECT * FROM `investments` WHERE `user_id` = ?",
          values: [user.id],
        }),
      })
        .then((response) => response.json())
        .then((data) => setInvestments(data));
    });
  };

  if (!loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-200 font-roboto">
        <SparkasseLoginRegistrationForms
          handleLogin={handleLogin}
          handleRegister={handleRegister}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-roboto">
      <header className="bg-[#FF0000] text-white p-4 flex justify-between items-center">
        <h1>Sparkasse Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="text-white font-roboto"
          >
            Profil
          </button>
          <button
            onClick={() => setLoggedIn(false)}
            className="text-white font-roboto"
          >
            Abmelden
          </button>
        </div>
      </header>
      <main className="flex-grow p-4">
        <div className="mb-4">
          <h2 className="text-xl mb-2">Kontostand: {balance} €</h2>
          <h2 className="text-xl mb-2">Neue Transaktion</h2>
          <div className="flex space-x-4">
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Betrag"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beschreibung"
              className="p-2 border rounded"
            />
            <button
              onClick={() => handleTransaction("deposit")}
              className="bg-green-500 text-white p-2 rounded"
            >
              Einzahlung
            </button>
            <button
              onClick={() => handleTransaction("withdrawal")}
              className="bg-red-500 text-white p-2 rounded"
            >
              Auszahlung
            </button>
          </div>
        </div>
        <h2 className="text-xl mb-2">Transaktionen</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Typ</th>
              <th className="py-2">Betrag</th>
              <th className="py-2">Beschreibung</th>
              <th className="py-2">Datum</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="text-center">
                <td className="py-2">{transaction.type}</td>
                <td className="py-2">{transaction.amount} €</td>
                <td className="py-2">{transaction.description}</td>
                <td className="py-2">
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <h2 className="text-xl mb-2">Sparpläne</h2>
          <button
            onClick={() => setShowSavingsForm(true)}
            className="bg-blue-500 text-white p-2 rounded mb-4"
          >
            Neuen Sparplan hinzufügen
          </button>
          <div className="space-y-4">
            {savingsAccounts.map((account) => (
              <div key={account.id} className="p-4 bg-white shadow rounded">
                <p>Betrag: {account.amount} €</p>
                <p>
                  Datum: {new Date(account.start_date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-xl mb-2">Kredite</h2>
          <button
            onClick={() => setShowLoanForm(true)}
            className="bg-blue-500 text-white p-2 rounded mb-4"
          >
            Neuen Kredit hinzufügen
          </button>
          <div className="space-y-4">
            {loans.map((loan) => (
              <div key={loan.id} className="p-4 bg-white shadow rounded">
                <p>Betrag: {loan.amount} €</p>
                <p>Zeitraum: {loan.term} Monate</p>
                <p>Datum: {new Date(loan.start_date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-xl mb-2">Nachrichten</h2>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="p-4 bg-white shadow rounded">
                <p>Betreff: {message.subject}</p>
                <p>Nachricht: {message.message}</p>
                <p>Datum: {new Date(message.timestamp).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-xl mb-2">Investitionen</h2>
          <button
            onClick={() => setShowInvestmentForm(true)}
            className="bg-blue-500 text-white p-2 rounded mb-4"
          >
            Neue Investition hinzufügen
          </button>
          <div className="space-y-4">
            {investments.map((investment) => (
              <div key={investment.id} className="p-4 bg-white shadow rounded">
                <p>Betrag: {investment.amount} €</p>
                <p>Details: {investment.details}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <aside className="p-4">
        <h2 className="text-xl mb-2">Benachrichtigungen</h2>
        <ul className="list-disc pl-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="mb-2">
              {notification.message}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {showNotifications ? "Verbergen" : "Anzeigen"}
        </button>
      </aside>
      {showProfile && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-[400px]">
            <h2 className="mb-4 text-lg font-bold text-center text-[#FF0000]">
              Profil bearbeiten
            </h2>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) =>
                setProfile({ ...profile, fullName: e.target.value })
              }
              placeholder="Vollständiger Name"
              className="mb-4 p-2 w-full border rounded"
            />
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              placeholder="Email"
              className="mb-4 p-2 w-full border rounded"
            />
            <button
              onClick={handleProfileUpdate}
              className="w-full bg-[#FF0000] text-white p-2 rounded"
            >
              Aktualisieren
            </button>
          </div>
        </div>
      )}
      {showSavingsForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-[400px]">
            <h2 className="mb-4 text-lg font-bold text-center text-[#FF0000]">
              Neuen Sparplan hinzufügen
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainComponent;