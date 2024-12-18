import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ProfileCard from "./components/ProfileCard";
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";
import {
  FaShieldAlt,
  FaChartLine,
  FaHandHoldingUsd,
  FaUserTie,
  FaRegLifeRing,
  FaRegClock,
} from "react-icons/fa";
import { API_URL } from "./config";
import Swal from "sweetalert2";

const ClientAbout = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentData, setPaymentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pensionPackages = [
    {
      advantages: [
        "Personalized investment strategy",
        "Dedicated wealth manager",
        "Premium health insurance with global coverage",
        "Exclusive retirement lifestyle benefits",
        "VIP concierge services",
        "Estate planning assistance",
      ],
      features: [
        "Global investment portfolio",
        "Private banking services",
        "Legacy planning support",
      ],
      image: ["https://picsum.photos/800/400?random=1"],
      color: ["purple"],
    },
    {
      advantages: [
        "Enhanced investment portfolio diversification",
        "Comprehensive health and life insurance",
        "Quarterly financial planning sessions",
        "Priority customer service",
        "Access to exclusive investment opportunities",
        "Regular retirement planning workshops",
      ],
      features: [
        "Partial withdrawal facility",
        "International investment options",
        "Enhanced tax benefits",
      ],
      image: ["https://picsum.photos/800/400?random=2"],
      color: ["blue"],
    },
    {
      advantages: [
        "Affordable monthly contributions starting from £50",
        "Guaranteed minimum return of 5% annually",
        "Basic health insurance coverage",
        "Annual financial review",
        "Online account management",
        "24/7 customer support",
      ],
      features: [
        "No lock-in period",
        "Tax-efficient savings",
        "Flexible contribution schedule",
      ],
      image: ["https://picsum.photos/800/400?random=3"],
      color: ["green"],
    },
  ];

  const fetchContributions = () => {
    const userId = localStorage.getItem("user");
    fetch(`${API_URL}/pension_products`)
      .then((res) => res.json())
      .then((resp) => {
        setIsLoading(false);
        if (resp.length > 0) {
          const combinedData = resp.map((product) => {
            const randomPackage =
              pensionPackages[
                Math.floor(Math.random() * pensionPackages.length)
              ];
            return {
              ...product,
              advantages: randomPackage.advantages,
              features: randomPackage.features,
              image: randomPackage.image,
              color: randomPackage.color,
            };
          });
          setPaymentData(combinedData);
        } else {
          Swal.fire({
            text: "Account has No Transactions!",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
        Swal.fire({
          text: "System Boot Failed, Please check your network connection!",
          icon: "error",
        });
      });
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="pension-content" style={styles.mainContent}>
        <ProfileCard />

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div  className="bg-gradient-success" style={styles.hero}>
              <h1 style={styles.mainTitle}>
                Secure Your Future with REMS Pension
              </h1>
              <p style={styles.heroText}>
                Building tomorrow's security through smart investments today.
              </p>
            </div>

            <div style={styles.tabContainer}>
              <button
                style={{
                  ...styles.tab,
                  backgroundColor:
                    activeTab === "overview" ? "#0bad0b" : "transparent",
                  color: activeTab === "overview" ? "white" : "#0bad0b",
                }}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                style={{
                  ...styles.tab,
                  backgroundColor:
                    activeTab === "packages" ? "#0bad0b" : "transparent",
                  color: activeTab === "packages" ? "white" : "#0bad0b",
                }}
                onClick={() => setActiveTab("packages")}
              >
                Pension Packages
              </button>
              <button
                style={{
                  ...styles.tab,
                  backgroundColor:
                    activeTab === "how" ? "#0bad0b" : "transparent",
                  color: activeTab === "how" ? "white" : "#0bad0b",
                }}
                onClick={() => setActiveTab("how")}
              >
                How It Works
              </button>
            </div>

            {activeTab === "overview" && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Why Choose REMS Pension?</h2>
                <div style={styles.featuresGrid}>
                  <div style={styles.featureCard}>
                    <FaShieldAlt size={30} color="#0bad0b" />
                    <h3>Guaranteed Security</h3>
                    <p>
                      Your investments are protected by government regulations
                      and insurance
                    </p>
                  </div>
                  <div style={styles.featureCard}>
                    <FaChartLine size={30} color="#0bad0b" />
                    <h3>Competitive Returns</h3>
                    <p>
                      Consistently outperforming market averages with strategic
                      investments
                    </p>
                  </div>
                  <div style={styles.featureCard}>
                    <FaHandHoldingUsd size={30} color="#0bad0b" />
                    <h3>Flexible Contributions</h3>
                    <p>
                      Adjust your contributions based on your financial
                      situation
                    </p>
                  </div>
                  <div style={styles.featureCard}>
                    <FaUserTie size={30} color="#0bad0b" />
                    <h3>Expert Management</h3>
                    <p>
                      Your funds are managed by industry-leading financial
                      experts
                    </p>
                  </div>
                </div>
                <div style={styles.statsSection}>
                  <div style={styles.statCard}>
                    <h3>£5B+</h3>
                    <p>Assets Under Management</p>
                  </div>
                  <div style={styles.statCard}>
                    <h3>30+</h3>
                    <p>Years of Experience</p>
                  </div>
                  <div style={styles.statCard}>
                    <h3>100K+</h3>
                    <p>Happy Members</p>
                  </div>
                  <div style={styles.statCard}>
                    <h3>8.5%</h3>
                    <p>Average Annual Return</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "packages" && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Our Pension Packages</h2>
                <div style={styles.packagesGrid}>
                  {paymentData.map((product) => (
                    <div key={product.id} style={styles.packageCard}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={styles.packageImage}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://picsum.photos/800/400?random=2";
                        }}
                      />
                      <div style={styles.packageContent}>
                        <h3
                          style={{
                            ...styles.packageTitle,
                            color: product.color,
                          }}
                        >
                          {product.product_name}
                        </h3>
                        <hr
                          style={{
                            ...styles.packageTitle,
                            color: product.color,
                          }}
                        ></hr>
                        <div style={styles.packageDetails}>
                          <p>
                            <strong>Monthly Contribution:</strong>{" "}
                            {product.contribution_amount}
                            {product.currency}
                          </p>
                          <p>
                            <strong>Type:</strong>{" "}
                            {product.pension_product_type}
                          </p>
                          <p>
                            <strong>Frequency:</strong>{" "}
                            {product.contribution_frequency}
                          </p>
                        </div>
                        <hr
                          style={{
                            ...styles.packageTitle,
                            color: product.color,
                          }}
                        ></hr>
                        <h4 style={styles.packageSubtitle}>Key Advantages</h4>
                        {product.advantages.length > 0 && (
                          <ul style={styles.advantagesList}>
                            {product.advantages.map((adv, i) => (
                              <li key={i}>{adv}</li>
                            ))}
                          </ul>
                        )}
                        <hr
                          style={{
                            ...styles.packageTitle,
                            color: product.color,
                          }}
                        ></hr>
                        <h4 style={styles.packageSubtitle}>Special Features</h4>
                        {product.features.length > 0 && (
                          <ul style={styles.featuresList}>
                            {product.features.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        )}
                        <button
                          style={{
                            ...styles.button,
                            backgroundColor: product.color,
                          }}
                          onClick={() => setSelectedPackage(product)}
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "how" && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                  How Our Pension System Works
                </h2>
                <div style={styles.processSection}>
                  <div style={styles.processStep}>
                    <div style={styles.processIcon}>
                      <FaRegClock size={30} color="#0bad0b" />
                    </div>
                    <h3>1. Join & Contribute</h3>
                    <p>
                      Choose your preferred package and set up your monthly
                      contributions. You can start with as little as £50 per
                      month.
                    </p>
                  </div>
                  <div style={styles.processStep}>
                    <div style={styles.processIcon}>
                      <FaChartLine size={30} color="#0bad0b" />
                    </div>
                    <h3>2. We Invest</h3>
                    <p>
                      Our expert team invests your contributions in a
                      diversified portfolio aligned with your risk profile and
                      goals.
                    </p>
                  </div>
                  <div style={styles.processStep}>
                    <div style={styles.processIcon}>
                      <FaRegLifeRing size={30} color="#0bad0b" />
                    </div>
                    <h3>3. Monitor & Grow</h3>
                    <p>
                      Track your pension's performance through our online portal
                      and receive regular updates and reports.
                    </p>
                  </div>
                </div>
                <div style={styles.infoBox}>
                  <h3>Important Information</h3>
                  <p>
                    Our pension fund is regulated by the Financial Conduct
                    Authority (FCA) and protected by the Financial Services
                    Compensation Scheme (FSCS). We follow strict investment
                    guidelines and maintain transparency in all our operations.
                  </p>
                  <p>
                    The value of investments can go down as well as up, and you
                    may get back less than you invested. Past performance is not
                    a reliable indicator of future results.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f8f9fc",
    minHeight: "100vh",
    overflowY: "auto",
  },
  hero: {
    // background: "linear-gradient(120deg, #4e73df, #36b9cc)",
    padding: "40px",
    borderRadius: "15px",
    color: "white",
    marginBottom: "30px",
    textAlign: "center",
  },
  mainTitle: {
    fontSize: "2.5em",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  heroText: {
    fontSize: "1.2em",
    lineHeight: "1.6",
    maxWidth: "800px",
    margin: "0 auto",
  },
  tabContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
  },
  tab: {
    padding: "10px 20px",
    border: "2px solid #0bad0b",
    borderRadius: "25px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "bold",
  },
  section: {
    padding: "20px",
  },
  sectionTitle: {
    fontSize: "2em",
    marginBottom: "30px",
    color: "#2e384d",
    textAlign: "center",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  featureCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  statsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "40px",
  },
  statCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  packagesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "30px",
  },
  packageCard: {
    backgroundColor: "white",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
  },
  packageImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  packageContent: {
    padding: "20px",
  },
  packageTitle: {
    fontSize: "1.5em",
    marginBottom: "15px",
  },
  packageSubtitle: {
    color: "#2e384d",
    marginTop: "20px",
    marginBottom: "10px",
  },
  packageDetails: {
    marginBottom: "20px",
  },
  advantagesList: {
    listStyle: "none",
    padding: "0",
    marginBottom: "20px",
  },
  featuresList: {
    listStyle: "none",
    padding: "0",
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "opacity 0.3s ease",
  },
  processSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    marginBottom: "40px",
  },
  processStep: {
    textAlign: "center",
    padding: "20px",
  },
  processIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#f8f9fc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px auto",
  },
  infoBox: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    marginTop: "40px",
  },
};

export default ClientAbout;
