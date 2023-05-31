

import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Problem2 = () => {
    const [showModalA, setShowModalA] = useState(false);
    const [showModalB, setShowModalB] = useState(false);
    const [showModalC, setShowModalC] = useState(false);
    const [onlyEven, setOnlyEven] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [contact, setContact] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://contact.mediusware.com/api/contacts/');
                const jsonData = await response.json();
                setContact(jsonData.results);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const handleAllContactsClick = () => {
        setShowModalA(true);
        setShowModalB(false);
        setShowModalC(false);
    };

    const handleUSContactsClick = () => {
        setShowModalA(false);
        setShowModalB(true);
        setShowModalC(false);
    };


    const handleCloseModalClick = () => {
        setShowModalA(false);
        setShowModalB(false);
        setShowModalC(false);
    };
    const handleContactsClick = async (contact) => {


        setShowModalA(false);
        setShowModalB(false);
        setShowModalC(true);
        setSelectedContact(contact);

    };

    const handleCheckboxChange = (event) => {
        setOnlyEven(event.target.checked);
    };

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        // Function to filter contacts based on search term and even/odd condition
        const filterContacts = () => {
            let filtered = contact;

            if (searchTerm) {
                filtered = filtered.filter((c) =>
                    c.phone.includes(searchTerm.toLowerCase())
                );
            }

            if (onlyEven) {
                filtered = filtered.filter((c) => c.id % 2 === 0);
            }

            setFilteredContacts(filtered);
        };

        // Delayed filtering on typing
        const delayTimer = setTimeout(filterContacts, 300);

        return () => clearTimeout(delayTimer);
    }, [searchTerm, onlyEven]);


    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-lg btn-outline-primary"
                        style={{ color: "#46139f" }}
                        type="button"
                        onClick={handleAllContactsClick}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-lg btn-outline-warning"
                        style={{ color: "#ff7f50" }}
                        type="button"
                        onClick={handleUSContactsClick}
                    >
                        US Contacts
                    </button>
                </div>
                {/* modal A */}
                <Modal show={showModalA} onHide={handleCloseModalClick}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal A</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                            />
                        </div>
                        {filteredContacts.map((c) => (
                            <p key={c.id} onClick={() => handleContactsClick(c)} >{c.phone}</p>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            style={{ color: "#46139f" }}
                            onClick={handleAllContactsClick}
                        >
                            All Contact
                        </Button>
                        <Button
                            variant="primary"
                            style={{ color: "#ff7f50" }}
                            onClick={handleUSContactsClick}
                        >
                            US Contact
                        </Button>
                        <Button
                            variant="secondary"
                            style={{ backgroundColor: "#46139f", borderColor: "#46139f" }}
                            onClick={handleCloseModalClick}
                        >
                            Close
                        </Button>
                        <div className="form-check">
                            <Form.Check
                                id="checkboxA"
                                label="Only even"
                                checked={onlyEven}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                    </Modal.Footer>
                </Modal>

                {/* modal B */}
                <Modal show={showModalB} onHide={handleCloseModalClick}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal B</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                            />
                        </div>
                        {filteredContacts
                            .filter((c) => c.country.name === "United States")
                            .map((c) => (
                                <p key={c.id} onClick={() => handleContactsClick(c)} >{c.phone}</p>
                            ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            style={{ color: "#46139f" }}
                            onClick={handleAllContactsClick}
                        >
                            All Contact
                        </Button>
                        <Button
                            variant="primary"
                            style={{ color: "#ff7f50" }}
                            onClick={handleUSContactsClick}
                        >
                            US Contact
                        </Button>
                        <Button
                            variant="secondary"
                            style={{ backgroundColor: "#46139f", borderColor: "#46139f" }}
                            onClick={handleCloseModalClick}
                        >
                            Close
                        </Button>
                        <div className="form-check">
                            <Form.Check
                                id="checkboxB"
                                label="Only even"
                                checked={onlyEven}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                    </Modal.Footer>
                </Modal>
                {/* Modal C */}
                {selectedContact && (
                    <Modal show={showModalC} onHide={handleCloseModalClick}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal C</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Phone: {selectedContact.phone}</p>
                            <p>Country: {selectedContact.country.name}</p>
                        </Modal.Body>
                        <Modal.Footer>

                            <Button
                                variant="secondary"
                                style={{ backgroundColor: "#46139f", borderColor: "#46139f" }}
                                onClick={handleCloseModalClick}
                            >
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default Problem2;