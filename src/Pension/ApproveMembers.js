import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import { PENSION_API_URL, UPLOADS_API_URL } from './component/config';

const ApproveMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState(null); // State for selected member

    useEffect(() => {
        const fetchUnapprovedMembers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${PENSION_API_URL}/members/members/WaitingApproval`);

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch members: ${errorText}`);
                }

                const data = await response.json();
                setMembers(data);
            } catch (error) {
                console.error('Fetch error:', error);
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUnapprovedMembers();
    }, []);

    const approveMember = async (memberId) => {
        try {
            const response = await fetch(`${PENSION_API_URL}/members/approve/${memberId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to approve member: ${errorText}`);
            }

            setMembers(members.filter(member => member.id !== memberId));
            Swal.fire({
                title: 'Success',
                text: 'Member approved successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.error('Approval error:', error);
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleViewClick = (member) => {
        setSelectedMember(member);
    };

    const handleCloseModal = () => {
        setSelectedMember(null);
    };

    const downloadDocument = (docUrl) => {
        const link = document.createElement('a');
        link.href = docUrl;
        link.download = docUrl.split('/').pop(); // Use the last part of the URL as the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <SideBar />
                <div className="col-md-9 ms-sm-auto col-lg-10 px-4">
                    <TopNav />
                    <h2 style={{marginTop: 75}}>Approve Members</h2>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.map(member => (
                                        <tr key={member.id}>
                                            <td>{member.id}</td>
                                            <td>{member.name}</td>
                                            <td>{member.email}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-success" 
                                                    onClick={() => approveMember(member.id)}
                                                >
                                                    Approve
                                                </button>
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn btn-info" 
                                                    onClick={() => handleViewClick(member)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <Footer />
                </div>
            </div>

            {/* Modal for Member Details */}
            {selectedMember && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Member Details</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Name:</strong> {selectedMember.name} {selectedMember.surname}</p>
                                <p><strong>Email:</strong> {selectedMember.email}</p>
                                <p><strong>Phone:</strong> {selectedMember.phone}</p>
                                <p><strong>Address:</strong> {selectedMember.address}</p>
                                <div>
                                    <strong>Profile Picture:</strong>
                                    {selectedMember.profilePic ? (
                                        <img 
                                            src={`${UPLOADS_API_URL}/${selectedMember.profilePic}`} 
                                            alt="Profile" 
                                            style={{ maxWidth: '100%', height: 'auto' }} 
                                        />
                                    ) : (
                                        <p>No profile picture available.</p>
                                    )}
                                </div>
                                <div>
                                    <strong>Identity Document:</strong>
                                    <div>
                                        <a
                                            href={`${UPLOADS_API_URL}/${selectedMember.identity_document_pic}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Document
                                        </a>
                                        <button 
                                            onClick={() => downloadDocument(`${UPLOADS_API_URL}/${selectedMember.identity_document_pic}`)} 
                                            className="btn btn-link"
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <strong>Address Proof:</strong>
                                    <div>


                                         <a
                                                                 href={`${UPLOADS_API_URL}/${selectedMember.address_proof_pic}`}
                                                                  target="_blank"
                                                                  rel="noopener noreferrer"
                                                                >
                                                                  View
                                                                </a>







                                        <button 
                                            onClick={() => downloadDocument(`${UPLOADS_API_URL}/${selectedMember.address_proof_pic}`)} 
                                            className="btn btn-link"
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApproveMembers;