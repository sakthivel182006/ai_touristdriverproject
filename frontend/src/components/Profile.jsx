import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully! 👋");
    navigate("/login");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-error">
        <div className="error-content">
          <div className="error-icon">🔒</div>
          <h2>User Data Not Found</h2>
          <p>Please log in to view your profile</p>
          <button className="error-btn" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="profile-title">
            <h1>My Profile</h1>
            <p>Manage your account information</p>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon">✈️</div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Trips Planned</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌍</div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Destinations</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Reviews</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎫</div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Bookings</p>
            </div>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="profile-card">
          <div className="card-header">
            <h2>Personal Information</h2>
            <button className="edit-btn">
              <span>✏️</span> Edit Profile
            </button>
          </div>

          <div className="profile-info">
            <div className="info-row">
              <div className="info-label">
                <span className="info-icon">👤</span>
                <span>Full Name</span>
              </div>
              <div className="info-value">
                <p>{user.name || "Not provided"}</p>
              </div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <span className="info-icon">📧</span>
                <span>Email Address</span>
              </div>
              <div className="info-value">
                <p>{user.email || "Not provided"}</p>
                <span className="verified-badge">✓ Verified</span>
              </div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <span className="info-icon">🆔</span>
                <span>User ID</span>
              </div>
              <div className="info-value">
                <p className="user-id">{user.id || "N/A"}</p>
                <button className="copy-btn" onClick={() => {
                  navigator.clipboard.writeText(user.id);
                  toast.info("User ID copied to clipboard!");
                }}>
                  📋 Copy
                </button>
              </div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <span className="info-icon">📅</span>
                <span>Member Since</span>
              </div>
              <div className="info-value">
                <p>{formatDate()}</p>
              </div>
            </div>
          </div>

          <div className="card-actions">
            <button className="action-btn change-password">
              🔒 Change Password
            </button>
            <button className="action-btn notifications">
              🔔 Notification Settings
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">✈️</div>
              <div className="activity-details">
                <h4>No trips planned yet</h4>
                <p>Start planning your first adventure with AI</p>
                <span className="activity-time">Just now</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">👤</div>
              <div className="activity-details">
                <h4>Account created</h4>
                <p>Welcome to Trip Organizer!</p>
                <span className="activity-time">{formatDate()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="danger-zone">
          <h3>⚠️ Danger Zone</h3>
          <div className="danger-content">
            <div className="danger-info">
              <p>Once you delete your account, there is no going back. Please be certain.</p>
            </div>
            <button className="delete-btn" onClick={() => toast.warning("This feature is coming soon!")}>
              Delete Account
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="logout-section">
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            <span>🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon">👋</div>
              <h3>Ready to Leave?</h3>
              <button className="modal-close" onClick={() => setShowLogoutModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to logout? You'll need to sign in again to access your account.</p>
            </div>
            <div className="modal-footer">
              <button className="modal-cancel" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="modal-confirm" onClick={logout}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;