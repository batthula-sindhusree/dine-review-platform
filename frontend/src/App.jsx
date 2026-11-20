
import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

const C = {
  maroon: "#74151c",
  dark: "#4d0d13",
  gold: "#d5a64a",
  cream: "#faf5eb",
  white: "#ffffff",
  text: "#382c28",
  muted: "#82736c",
  border: "#eee3d2",
  green: "#28734a",
  red: "#a52a2a"
};

// ILLUSTRATED BIRYANI IMAGE
const biryaniImage = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="bg" x2="0" y2="1">
      <stop stop-color="#fff4d8"/>
      <stop offset="1" stop-color="#f2d39b"/>
    </linearGradient>
    <linearGradient id="bowl" x2="0" y2="1">
      <stop stop-color="#a52a2a"/>
      <stop offset="1" stop-color="#541018"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" rx="24" fill="url(#bg)"/>
  <circle cx="400" cy="245" r="185" fill="#e8c17a"/>
  <ellipse cx="400" cy="340" rx="225" ry="65" fill="#6d1720"/>
  <path d="M175 230 Q400 175 625 230 L555 355 Q400 415 245 355Z" fill="url(#bowl)"/>
  <ellipse cx="400" cy="230" rx="225" ry="95" fill="#fff0c2"/>
  <ellipse cx="400" cy="230" rx="205" ry="78" fill="#d99b36"/>
  <g fill="#fff0b0" stroke="#b77b25" stroke-width="3">
    <path d="M260 220 l12 -35 9 37z"/>
    <path d="M315 205 l15 -38 8 40z"/>
    <path d="M365 225 l10 -43 13 42z"/>
    <path d="M420 200 l13 -37 10 42z"/>
    <path d="M480 225 l12 -42 10 45z"/>
    <path d="M530 210 l13 -35 8 39z"/>
    <path d="M290 255 l12 -35 10 39z"/>
    <path d="M390 260 l12 -38 10 40z"/>
    <path d="M465 260 l12 -35 10 39z"/>
  </g>
  <g fill="#a52a2a">
    <path d="M300 205 q25 -35 45 2 q-15 30 -40 12z"/>
    <path d="M440 225 q25 -35 45 2 q-15 30 -40 12z"/>
    <path d="M355 255 q25 -35 45 2 q-15 30 -40 12z"/>
    <path d="M505 190 q22 -30 40 4 q-12 25 -35 10z"/>
  </g>
  <g fill="#438044">
    <path d="M340 190 q-25 -30 8 -32 q18 20 -8 32"/>
    <path d="M455 180 q20 -35 35 -5 q-10 25 -35 5"/>
    <path d="M390 245 q-25 -28 5 -35 q20 20 -5 35"/>
  </g>
  <g fill="#fff7dc">
    <ellipse cx="270" cy="245" rx="25" ry="16"/>
    <ellipse cx="520" cy="245" rx="25" ry="16"/>
  </g>
  <text x="400" y="455" text-anchor="middle" font-family="Georgia" font-size="30" font-weight="bold" fill="#74151c">PARADISE BIRYANI</text>
</svg>
`)}`;

// FOOD IMAGES
const punjabiImage =
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900";

const foodImages = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58bd?w=900",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900",
  biryaniImage,
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900"
];

const styles = {
  app: {
    minHeight: "100vh",
    background: C.cream,
    color: C.text,
    fontFamily: "Arial, sans-serif"
  },
  sidebar: {
    width: 245,
    minHeight: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    background: `linear-gradient(180deg, ${C.dark}, ${C.maroon})`,
    color: C.white,
    padding: "25px 16px",
    boxSizing: "border-box",
    zIndex: 5
  },
  main: {
    marginLeft: 245,
    padding: "28px 32px",
    minHeight: "100vh",
    boxSizing: "border-box"
  },
  card: {
    background: C.white,
    border: `1px solid ${C.border}`,
    borderRadius: 15,
    padding: 20,
    boxShadow: "0 5px 18px rgba(70,30,20,.05)"
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    margin: "7px 0 14px",
    border: `1px solid ${C.border}`,
    borderRadius: 9,
    outlineColor: C.gold,
    fontSize: 14,
    background: "#fffefa"
  },
  button: {
    background: C.maroon,
    color: C.white,
    border: "none",
    padding: "11px 17px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    margin: "4px 5px 4px 0"
  },
  lightButton: {
    background: "#fff8e9",
    color: C.maroon,
    border: `1px solid ${C.gold}`,
    padding: "10px 15px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    margin: "4px 5px 4px 0"
  },
  dangerButton: {
    background: "#a52a2a",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    margin: "4px 5px 4px 0"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: 18
  },
  title: {
    color: C.maroon,
    marginTop: 0,
    marginBottom: 18
  }
};

// FOOD IMAGE SELECTION
function getFoodImage(restaurant) {
  const name = (restaurant?.name || "").toLowerCase();
  const cuisine = (restaurant?.cuisine || "").toLowerCase();

  if (
    name.includes("punjabi zaika") ||
    name.includes("punjabi") ||
    cuisine.includes("north indian") ||
    cuisine.includes("punjabi")
  ) {
    return punjabiImage;
  }

  if (
    name.includes("paradise") ||
    name.includes("biryani") ||
    cuisine.includes("biryani")
  ) {
    return biryaniImage;
  }

  if (name.includes("pizza") || cuisine.includes("pizza")) {
    return foodImages[1];
  }

  if (name.includes("burger") || cuisine.includes("burger")) {
    return foodImages[0];
  }

  if (
    name.includes("spice garden") ||
    cuisine.includes("south indian")
  ) {
    return foodImages[4];
  }

  if (cuisine.includes("salad")) {
    return foodImages[4];
  }

  if (
    cuisine.includes("grill") ||
    cuisine.includes("bbq")
  ) {
    return foodImages[5];
  }

  const index = (restaurant?.name?.length || 0) % foodImages.length;
  return foodImages[index];
}

function handleFoodImageError(e, restaurant) {
  e.currentTarget.onerror = null;

  const name = (restaurant?.name || "").toLowerCase();
  const cuisine = (restaurant?.cuisine || "").toLowerCase();

  if (
    name.includes("punjabi zaika") ||
    name.includes("punjabi") ||
    cuisine.includes("north indian") ||
    cuisine.includes("punjabi")
  ) {
    e.currentTarget.src = punjabiImage;
    return;
  }

  if (name.includes("paradise") || name.includes("biryani")) {
    e.currentTarget.src = biryaniImage;
  } else {
    e.currentTarget.src = foodImages[4];
  }
}

function Sidebar({ role, active, setActive, logout, user }) {
  const menus = {
    admin: [
      ["Overview", "overview"],
      ["Create Restaurant", "create"],
      ["Restaurants", "restaurants"],
      ["Users & Owners", "users"],
      ["Customer Reviews", "reviews"]
    ],
    customer: [
      ["Explore Restaurants", "explore"],
      ["My Reviews", "myreviews"]
    ],
    owner: [
      ["Overview", "overview"],
      ["My Restaurant", "restaurant"],
      ["Update Details", "update"],
      ["Customer Reviews", "reviews"]
    ]
  };

  return (
    <aside style={styles.sidebar}>
      <div style={{ textAlign: "center", marginBottom: 35 }}>
        <div style={{ fontSize: 38 }}>🍽️</div>
        <h2 style={{ fontSize: 19, margin: "8px 0 4px" }}>
          Dine & Review
        </h2>
        <small style={{ color: "#e9c982" }}>
          Restaurant Platform
        </small>
      </div>

      <div style={{
        borderTop: "1px solid #ffffff30",
        borderBottom: "1px solid #ffffff30",
        padding: "15px 5px",
        marginBottom: 20
      }}>
        <div style={{ fontWeight: 700 }}>
          {user.name || user.email}
        </div>
        <small style={{ color: "#e9c982" }}>
          {role.toUpperCase()}
        </small>
      </div>

      {(menus[role] || []).map(([label, id]) => (
        <button
          key={id}
          onClick={() => setActive(id)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "13px 14px",
            margin: "6px 0",
            borderRadius: 8,
            border: active === id
              ? `1px solid ${C.gold}`
              : "1px solid transparent",
            background: active === id
              ? "#ffffff20"
              : "transparent",
            color: active === id ? "#f4d28c" : "#fff",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: active === id ? 700 : 500
          }}
        >
          {active === id ? "◆  " : "  "}
          {label}
        </button>
      ))}

      <button
        onClick={logout}
        style={{
          ...styles.lightButton,
          width: "100%",
          marginTop: 35
        }}
      >
        ↪ Logout
      </button>
    </aside>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div style={{
      ...styles.card,
      borderTop: `4px solid ${C.gold}`,
      textAlign: "center"
    }}>
      <div style={{ fontSize: 27 }}>{icon}</div>
      <p style={{ color: C.muted, margin: "9px 0" }}>{label}</p>
      <div style={{
        fontSize: 28,
        fontWeight: 700,
        color: C.maroon
      }}>
        {value}
      </div>
    </div>
  );
}

function RestaurantCard({
  restaurant,
  distribution,
  onWrite,
  onView,
  admin,
  owner,
  onDelete,
  onAssign,
  owners
}) {
  const totalReviews = Number(restaurant.reviewCount || 0);
  const hasRatings = totalReviews > 0;

  return (
    <div style={{
      ...styles.card,
      padding: 0,
      overflow: "hidden"
    }}>
      <img
        src={getFoodImage(restaurant)}
        alt={`${restaurant.name} food`}
        style={{
          width: "100%",
          height: 175,
          objectFit: "cover",
          display: "block"
        }}
        onError={(e) => handleFoodImageError(e, restaurant)}
      />

      <div style={{ padding: 18 }}>
        <h3 style={{
          color: C.maroon,
          margin: "0 0 10px",
          fontSize: 19
        }}>
          {restaurant.name}
        </h3>

        <p style={{ margin: "7px 0", color: C.muted }}>
          📍 {restaurant.location}
        </p>
        <p style={{ margin: "7px 0", color: C.muted }}>
          🍴 {restaurant.cuisine}
        </p>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 13,
          padding: 13,
          background: "#fff8e9",
          borderRadius: 10,
          margin: "15px 0"
        }}>
          <div style={{ fontSize: 29 }}>⭐</div>
          <div>
            {hasRatings ? (
              <>
                <div style={{
                  fontWeight: 700,
                  color: C.maroon,
                  fontSize: 21
                }}>
                  {Number(restaurant.averageRating || 0).toFixed(1)} / 5
                </div>
                <small style={{ color: C.muted }}>
                  {totalReviews} customer reviews
                </small>
              </>
            ) : (
              <>
                <div style={{
                  fontWeight: 700,
                  color: C.maroon,
                  fontSize: 17
                }}>
                  No ratings yet
                </div>
                <small style={{ color: C.muted }}>
                  Be the first to review this restaurant.
                </small>
              </>
            )}
          </div>
        </div>

        <div style={{
          borderTop: `1px solid ${C.border}`,
          paddingTop: 12
        }}>
          <b style={{ color: C.maroon, fontSize: 13 }}>
            Rating Distribution
          </b>

          {!hasRatings ? (
            <p style={{
              color: C.muted,
              fontSize: 13,
              margin: "10px 0 4px"
            }}>
              No rating distribution available yet.
            </p>
          ) : (
            [5, 4, 3, 2, 1].map((star) => {
              const count = distribution?.[star] || 0;
              const percent = count / totalReviews * 100;

              return (
                <div key={star} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 7,
                  fontSize: 12
                }}>
                  <span style={{ width: 30 }}>{star} ★</span>
                  <div style={{
                    height: 7,
                    flex: 1,
                    background: "#eee5d7",
                    borderRadius: 10,
                    overflow: "hidden"
                  }}>
                    <div style={{
                      width: `${percent}%`,
                      height: "100%",
                      background: C.gold
                    }} />
                  </div>
                  <span>{count}</span>
                </div>
              );
            })
          )}
        </div>

        {admin && (
          <>
            <p style={{ marginTop: 15 }}>
              Owner: <b>{restaurant.owner?.name || "Not assigned"}</b>
            </p>

            <select
              style={styles.input}
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) {
                  onAssign(restaurant._id, e.target.value);
                  e.target.value = "";
                }
              }}
            >
              <option value="">Assign an owner</option>
              {owners.map((o) => (
                <option key={o._id} value={o._id}>
                  {o.name} ({o.email})
                </option>
              ))}
            </select>

            <button
              style={styles.dangerButton}
              onClick={() => onDelete(restaurant._id)}
            >
              Delete Restaurant
            </button>
          </>
        )}

        {owner && (
          <p style={{ color: C.green, fontWeight: 600 }}>
            Your Assigned Restaurant
          </p>
        )}

        {onWrite && (
          <button
            style={{ ...styles.button, width: "100%", marginTop: 14 }}
            onClick={() => onWrite(restaurant)}
          >
            ✍ Write a Review
          </button>
        )}

        {onView && (
          <button
            style={{ ...styles.lightButton, width: "100%" }}
            onClick={() => onView(restaurant)}
          >
            View Reviews
          </button>
        )}
      </div>
    </div>
  );
}

// APP
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [restaurants, setRestaurants] = useState([]);
  const [ratingDistributions, setRatingDistributions] = useState({});
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [dashboard, setDashboard] = useState({});

  const [active, setActive] = useState("overview");
  const [search, setSearch] = useState("");
  const [adminUserSearch, setAdminUserSearch] = useState("");
  const [adminRestaurantSearch, setAdminRestaurantSearch] = useState("");

  const [selected, setSelected] = useState(null);
  const [viewingRestaurant, setViewingRestaurant] = useState(null);
  const [restaurantReviews, setRestaurantReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const notify = (msg) => {
    setMessage(msg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadRestaurants = async () => {
    try {
      const res = await axios.get(`${API}/restaurants`);
      const list = res.data.restaurants || [];
      setRestaurants(list);

      const results = await Promise.all(
        list.map(async (r) => {
          try {
            const response = await axios.get(
              `${API}/restaurants/${r._id}/ratings`
            );
            return [r._id, response.data.ratingDistribution];
          } catch {
            return [r._id, {}];
          }
        })
      );

      setRatingDistributions(Object.fromEntries(results));
    } catch {
      notify("Unable to load restaurants.");
    }
  };

  const loadRestaurantReviews = async (id) => {
    try {
      const res = await axios.get(`${API}/reviews/${id}`);
      setRestaurantReviews(res.data.reviews || []);
    } catch {
      notify("Unable to load reviews.");
    }
  };

  const loadDashboard = async () => {
    try {
      if (user.role === "admin") {
        const [stats, userData, reviewData] = await Promise.all([
          axios.get(`${API}/admin/dashboard`, { headers }),
          axios.get(`${API}/admin/users`, { headers }),
          axios.get(`${API}/admin/reviews`, { headers })
        ]);

        setDashboard(stats.data.dashboard || {});
        setUsers(userData.data.users || []);
        setReviews(reviewData.data.reviews || []);
      }

      if (user.role === "owner") {
        const res = await axios.get(`${API}/owner/dashboard`, { headers });
        setDashboard(res.data);
      }

      await loadRestaurants();
    } catch (err) {
      notify(err.response?.data?.message || "Dashboard loading failed.");
    }
  };

  useEffect(() => {
    if (user) loadDashboard();
  }, [user]);

  // AUTHENTICATION
  const submitAuth = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const endpoint = mode === "login" ? "login" : "register";

      const payload = mode === "login"
        ? { email: form.email, password: form.password }
        : form;

      const res = await axios.post(`${API}/auth/${endpoint}`, payload);

      if (mode === "register") {
        notify("Registration successful! Please login.");
        setMode("login");
        setForm({ name: "", email: form.email, password: "" });
        return;
      }

      const jwt = res.data.token;
      const jwtData = JSON.parse(atob(jwt.split(".")[1]));

      setToken(jwt);
      setUser(res.data.user || {
        id: jwtData.id,
        role: jwtData.role,
        name: form.email
      });

      setActive(
        jwtData.role === "customer" ? "explore" : "overview"
      );

      notify("Login successful!");
    } catch (err) {
      notify(err.response?.data?.message || "Authentication failed.");
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    setRestaurants([]);
    setUsers([]);
    setReviews([]);
    setDashboard({});
    setSelected(null);
    setViewingRestaurant(null);
    setMessage("Logged out successfully.");
  };

  // CUSTOMER REVIEW ACTIONS
  const openWrite = (r) => {
    setSelected(r);
    setViewingRestaurant(null);
    setComment("");
    setRating(5);
    setActive("write");
    setMessage("");
  };

  const openView = async (r) => {
    setViewingRestaurant(r);
    setSelected(null);
    setActive("view");
    await loadRestaurantReviews(r._id);
  };

  const submitReview = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      notify("Please enter your review.");
      return;
    }

    try {
      await axios.post(`${API}/reviews`, {
        restaurant: selected._id,
        rating: Number(rating),
        comment: comment.trim()
      }, { headers });

      setComment("");
      setRating(5);
      notify("Review submitted successfully!");
      await loadRestaurants();
    } catch (err) {
      notify(err.response?.data?.message || "Review submission failed.");
    }
  };

  const updateReview = async (id, newRating, newComment) => {
    try {
      await axios.put(`${API}/reviews/${id}`, {
        rating: Number(newRating),
        comment: newComment
      }, { headers });

      setEditingReview(null);
      await loadRestaurantReviews(viewingRestaurant._id);
      await loadRestaurants();
      notify("Review updated successfully!");
    } catch (err) {
      notify(err.response?.data?.message || "Review update failed.");
    }
  };

  const deleteCustomerReview = async (id) => {
    if (!window.confirm("Delete your review?")) return;

    try {
      await axios.delete(`${API}/reviews/${id}`, { headers });
      await loadRestaurantReviews(viewingRestaurant._id);
      await loadRestaurants();
      notify("Review deleted successfully!");
    } catch (err) {
      notify(err.response?.data?.message || "Review deletion failed.");
    }
  };

  // ADMIN ACTIONS
  const createRestaurant = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    try {
      await axios.post(`${API}/restaurants`, data, { headers });
      e.target.reset();
      await loadDashboard();
      notify("Restaurant created successfully!");
    } catch (err) {
      notify(err.response?.data?.message || "Could not create restaurant.");
    }
  };

  const createOwner = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    try {
      await axios.post(`${API}/admin/owners`, data, { headers });
      e.target.reset();
      await loadDashboard();
      notify("Owner account created successfully!");
    } catch (err) {
      notify(err.response?.data?.message || "Could not create owner.");
    }
  };

  const assignOwner = async (restaurantId, ownerId) => {
    try {
      await axios.put(
        `${API}/restaurants/${restaurantId}/assign-owner`,
        { ownerId },
        { headers }
      );
      await loadDashboard();
      notify("Owner assigned successfully!");
    } catch (err) {
      notify(err.response?.data?.message || "Owner assignment failed.");
    }
  };

  const deleteRestaurant = async (id) => {
    if (!window.confirm("Delete this restaurant?")) return;

    try {
      await axios.delete(`${API}/restaurants/${id}`, { headers });
      await loadDashboard();
      notify("Restaurant deleted successfully!");
    } catch (err) {
      notify(err.response?.data?.message || "Restaurant deletion failed.");
    }
  };

  const deleteAdminReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await axios.delete(`${API}/admin/reviews/${id}`, { headers });
      await loadDashboard();
      notify("Review deleted successfully!");
    } catch (err) {
      notify(err.response?.data?.message || "Review deletion failed.");
    }
  };

  // DELETE USER (ADMIN)
  const deleteAdminUser = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    try {
      await axios.delete(`${API}/admin/users/${id}`, { headers });
      await loadDashboard();
      notify("User deleted successfully!");
    } catch (err) {
      notify(err.response?.data?.message || "User deletion failed.");
    }
  };

  // OWNER ACTION
  const updateOwnerRestaurant = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    try {
      await axios.put(
        `${API}/restaurants/${dashboard.restaurant._id}`,
        data,
        { headers }
      );
      await loadDashboard();
      notify("Restaurant details updated successfully!");
    } catch (err) {
      notify(err.response?.data?.message || "Restaurant update failed.");
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // FILTERS
  const filteredRestaurants = restaurants.filter((r) =>
    `${r.name} ${r.location} ${r.cuisine}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.email} ${u.role}`
      .toLowerCase()
      .includes(adminUserSearch.toLowerCase())
  );

  const filteredAdminRestaurants = restaurants.filter((r) =>
    `${r.name} ${r.location} ${r.cuisine}`
      .toLowerCase()
      .includes(adminRestaurantSearch.toLowerCase())
  );

  const owners = users.filter((u) => u.role === "owner");

  // LOGIN PAGE
  if (!user) {
    return (
      <div style={{
        ...styles.app,
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 20,
        background: `linear-gradient(#faf5ebbb,#faf5ebbb),url('/restaurant-bg.png') center/cover`
      }}>
        <form onSubmit={submitAuth} style={{
          ...styles.card,
          width: "100%",
          maxWidth: 410,
          boxSizing: "border-box",
          padding: 32,
          borderTop: `5px solid ${C.gold}`
        }}>
          <div style={{ textAlign: "center", fontSize: 43 }}>🍽️</div>
          <h2 style={{ textAlign: "center", color: C.maroon }}>
            Restaurant Review Platform
          </h2>
          <p style={{ textAlign: "center", color: C.muted }}>
            Discover. Review. Enjoy.
          </p>
          <h3 style={{ textAlign: "center", color: C.maroon }}>
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h3>

          {mode === "register" && (
            <input
              style={styles.input}
              placeholder="Full Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}

          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button style={{ ...styles.button, width: "100%", padding: 13 }}>
            {mode === "login" ? "Login" : "Register"}
          </button>

          <p style={{ textAlign: "center", marginTop: 18 }}>
            {mode === "login" ? "New here?" : "Already registered?"}
            {" "}
            <button
              type="button"
              style={styles.lightButton}
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setMessage("");
              }}
            >
              {mode === "login" ? "Create Account" : "Login"}
            </button>
          </p>

          {message && (
            <p style={{ color: C.green, textAlign: "center" }}>
              {message}
            </p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <Sidebar
        role={user.role}
        active={active}
        setActive={(id) => {
          setActive(id);
          setMessage("");
          scrollToTop();
        }}
        logout={logout}
        user={user}
      />

      <main style={styles.main}>
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 25
        }}>
          <div>
            <small style={{ color: C.muted }}>
              RESTAURANT REVIEW PLATFORM
            </small>
            <h2 style={{ color: C.maroon, margin: "6px 0" }}>
              {user.role === "admin" ? "Admin Dashboard" :
               user.role === "owner" ? "Owner Dashboard" :
               "Explore Restaurants"}
            </h2>
          </div>

          <div style={{
            background: "#fff",
            padding: "11px 16px",
            borderRadius: 10,
            border: `1px solid ${C.border}`
          }}>
            👤 {user.name || user.email}
          </div>
        </header>

        {message && (
          <div style={{
            ...styles.card,
            borderLeft: `4px solid ${C.green}`,
            color: C.green,
            marginBottom: 20
          }}>
            {message}
          </div>
        )}

        {/* ADMIN DASHBOARD */}
        {user.role === "admin" && (
          <>
            {active === "overview" && (
              <>
                <div style={{
                  background: `linear-gradient(120deg,${C.dark},${C.maroon})`,
                  color: "white",
                  padding: 28,
                  borderRadius: 16,
                  marginBottom: 23
                }}>
                  <h1 style={{ margin: "0 0 8px" }}>
                    Welcome, Administrator 👑
                  </h1>
                  <p style={{ margin: 0, color: "#f2dcb3" }}>
                    Monitor and manage your restaurant review platform.
                  </p>
                </div>

                <h3 style={styles.title}>Platform Overview</h3>

                <div style={{ ...styles.grid, marginBottom: 25 }}>
                  <StatCard icon="👥" label="Total Users"
                    value={dashboard.totalUsers ?? 0} />
                  <StatCard icon="🍽️" label="Total Restaurants"
                    value={dashboard.totalRestaurants ?? 0} />
                  <StatCard icon="📝" label="Total Reviews"
                    value={dashboard.totalReviews ?? 0} />
                  <StatCard icon="⭐" label="Average Rating"
                    value={Number(dashboard.totalReviews || 0) > 0
                      ? `${Number(dashboard.averagePlatformRating || 0).toFixed(1)} / 5`
                      : "No ratings yet"} />
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.4fr) minmax(280px, 1fr)",
                  gap: 20,
                  alignItems: "start"
                }}>
                  <section style={styles.card}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 18
                    }}>
                      <div>
                        <h3 style={{ ...styles.title, marginBottom: 5 }}>
                          Recent Restaurants
                        </h3>
                        <small style={{ color: C.muted }}>
                          Restaurants listed on your platform
                        </small>
                      </div>
                      <button
                        style={styles.lightButton}
                        onClick={() => setActive("restaurants")}
                      >
                        View All
                      </button>
                    </div>

                    {restaurants.length === 0 ? (
                      <p style={{ color: C.muted }}>
                        No restaurants available.
                      </p>
                    ) : (
                      restaurants.slice(0, 3).map((r) => (
                        <div key={r._id} style={{
                          display: "flex",
                          gap: 14,
                          alignItems: "center",
                          padding: "13px 0",
                          borderBottom: `1px solid ${C.border}`
                        }}>
                          <img
                            src={getFoodImage(r)}
                            alt={r.name}
                            onError={(e) => handleFoodImageError(e, r)}
                            style={{
                              width: 92,
                              height: 82,
                              objectFit: "cover",
                              borderRadius: 10,
                              flexShrink: 0
                            }}
                          />

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 style={{
                              color: C.maroon,
                              margin: "0 0 6px",
                              fontSize: 16
                            }}>
                              {r.name}
                            </h4>
                            <p style={{
                              margin: "4px 0",
                              color: C.muted,
                              fontSize: 13
                            }}>
                              📍 {r.location}
                            </p>
                            <p style={{
                              margin: "4px 0",
                              color: C.muted,
                              fontSize: 13
                            }}>
                              🍴 {r.cuisine}
                            </p>
                            <div style={{
                              color: "#ad790d",
                              fontSize: 13,
                              fontWeight: 700
                            }}>
                              {Number(r.reviewCount || 0) > 0 ? (
                                <>
                                  ⭐ {Number(r.averageRating || 0).toFixed(1)} / 5
                                  <span style={{
                                    color: C.muted,
                                    fontWeight: 400,
                                    marginLeft: 8
                                  }}>
                                    ({r.reviewCount} reviews)
                                  </span>
                                </>
                              ) : (
                                <span style={{ color: C.muted }}>
                                  No ratings yet
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </section>

                  <section style={styles.card}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 18
                    }}>
                      <div>
                        <h3 style={{ ...styles.title, marginBottom: 5 }}>
                          Recent Customer Reviews
                        </h3>
                        <small style={{ color: C.muted }}>
                          Latest customer feedback
                        </small>
                      </div>
                      <button
                        style={styles.lightButton}
                        onClick={() => setActive("reviews")}
                      >
                        View All
                      </button>
                    </div>

                    {reviews.length === 0 ? (
                      <p style={{ color: C.muted }}>
                        No customer reviews yet.
                      </p>
                    ) : (
                      [...reviews].slice(-3).reverse().map((r) => (
                        <div key={r._id} style={{
                          padding: "14px 0",
                          borderBottom: `1px solid ${C.border}`
                        }}>
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 8,
                            flexWrap: "wrap"
                          }}>
                            <b style={{
                              color: C.maroon,
                              fontSize: 14
                            }}>
                              {r.customer?.name || "Customer"}
                            </b>
                            <span style={{
                              color: "#ad790d",
                              fontSize: 13,
                              whiteSpace: "nowrap"
                            }}>
                              {"⭐".repeat(r.rating || 0)}
                            </span>
                          </div>

                          <p style={{
                            color: C.muted,
                            fontSize: 12,
                            margin: "6px 0"
                          }}>
                            {r.restaurant?.name || "Restaurant"}
                          </p>

                          <p style={{
                            color: C.text,
                            fontSize: 13,
                            lineHeight: 1.6,
                            margin: "7px 0 0",
                            overflowWrap: "anywhere"
                          }}>
                            {r.comment}
                          </p>
                        </div>
                      ))
                    )}
                  </section>
                </div>
              </>
            )}

            {active === "create" && (
              <>
                <h2 style={styles.title}>Create & Manage Accounts</h2>

                <div style={styles.grid}>
                  <div style={styles.card}>
                    <h3 style={styles.title}>🍽️ Create Restaurant</h3>
                    <form onSubmit={createRestaurant}>
                      <label>Restaurant Name</label>
                      <input style={styles.input} name="name"
                        placeholder="Enter restaurant name" required />
                      <label>Location</label>
                      <input style={styles.input} name="location"
                        placeholder="Enter location" required />
                      <label>Cuisine</label>
                      <input style={styles.input} name="cuisine"
                        placeholder="Enter cuisine" required />
                      <button style={styles.button}>Create Restaurant</button>
                    </form>
                  </div>

                  <div style={styles.card}>
                    <h3 style={styles.title}>👤 Create Restaurant Owner</h3>
                    <form onSubmit={createOwner}>
                      <label>Owner Name</label>
                      <input style={styles.input} name="name"
                        placeholder="Enter owner name" required />
                      <label>Email</label>
                      <input style={styles.input} name="email"
                        type="email" placeholder="Enter email" required />
                      <label>Password</label>
                      <input style={styles.input} name="password"
                        type="password" placeholder="Create password" required />
                      <button style={styles.button}>Create Owner</button>
                    </form>
                  </div>
                </div>
              </>
            )}

            {active === "restaurants" && (
              <>
                <h2 style={styles.title}>🏪 Manage Restaurants</h2>
                <input
                  style={styles.input}
                  placeholder="Search restaurants by name, location or cuisine..."
                  value={adminRestaurantSearch}
                  onChange={(e) => setAdminRestaurantSearch(e.target.value)}
                />

                <div style={styles.grid}>
                  {filteredAdminRestaurants.map((r) => (
                    <RestaurantCard
                      key={r._id}
                      restaurant={r}
                      distribution={ratingDistributions[r._id]}
                      admin
                      owners={owners}
                      onAssign={assignOwner}
                      onDelete={deleteRestaurant}
                    />
                  ))}
                </div>
              </>
            )}

            {active === "users" && (
              <>
                <h2 style={styles.title}>👥 Manage Users & Owners</h2>
                <input
                  style={styles.input}
                  placeholder="Search users by name, email or role..."
                  value={adminUserSearch}
                  onChange={(e) => setAdminUserSearch(e.target.value)}
                />

                <div style={styles.grid}>
                  {filteredUsers.map((u) => (
                    <div key={u._id} style={styles.card}>
                      <div style={{ fontSize: 25 }}>👤</div>
                      <h3 style={{ color: C.maroon }}>{u.name}</h3>
                      <p>{u.email}</p>
                      <span style={{
                        display: "inline-block",
                        background: "#f5e8cc",
                        color: C.maroon,
                        padding: "6px 12px",
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 700
                      }}>
                        {u.role}
                      </span>

                      {/* DELETE BUTTON FOR CUSTOMER AND OWNER ACCOUNTS */}
                      {u.role !== "admin" && (
                        <div>
                          <button
                            style={{
                              ...styles.dangerButton,
                              marginTop: 15
                            }}
                            onClick={() => deleteAdminUser(u._id, u.name)}
                          >
                            Delete User
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredUsers.length === 0 && (
                  <div style={styles.card}>
                    No users found.
                  </div>
                )}
              </>
            )}

            {active === "reviews" && (
              <>
                <h2 style={styles.title}>⭐ Customer Reviews</h2>
                {reviews.length === 0 ? (
                  <div style={styles.card}>No reviews available.</div>
                ) : reviews.map((r) => (
                  <div key={r._id} style={{ ...styles.card, marginBottom: 13 }}>
                    <b style={{ color: C.maroon }}>
                      {r.customer?.name || "Customer"}
                    </b>
                    {" · "}
                    {r.restaurant?.name || "Restaurant"}
                    <p style={{ color: "#ad790d" }}>
                      {"⭐".repeat(r.rating || 0)}
                    </p>
                    <p>{r.comment}</p>
                    <button
                      style={styles.dangerButton}
                      onClick={() => deleteAdminReview(r._id)}
                    >
                      Delete Review
                    </button>
                  </div>
                ))}
              </>
            )}
          </>
        )}

        {/* CUSTOMER DASHBOARD */}
        {user.role === "customer" && (
          <>
            {active === "explore" && (
              <>
                <div style={{
                  background: `linear-gradient(120deg,${C.dark},${C.maroon})`,
                  color: "white",
                  borderRadius: 16,
                  padding: 28,
                  marginBottom: 22
                }}>
                  <h1 style={{ margin: "0 0 10px" }}>
                    Discover Your Next Favourite Meal 🍴
                  </h1>
                  <p style={{ color: "#f2dcb3", margin: 0 }}>
                    Explore restaurants and share your dining experiences.
                  </p>
                </div>

                <input
                  style={styles.input}
                  placeholder="🔍 Search restaurant, location or cuisine..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <h3 style={styles.title}>Explore Restaurants</h3>

                <div style={styles.grid}>
                  {filteredRestaurants.map((r) => (
                    <RestaurantCard
                      key={r._id}
                      restaurant={r}
                      distribution={ratingDistributions[r._id]}
                      onWrite={openWrite}
                      onView={openView}
                    />
                  ))}
                </div>

                {filteredRestaurants.length === 0 && (
                  <div style={styles.card}>No restaurants found.</div>
                )}
              </>
            )}

            {active === "write" && selected && (
              <>
                <button style={styles.lightButton} onClick={() => setActive("explore")}>
                  ← Back to Restaurants
                </button>

                <div style={{ ...styles.card, maxWidth: 700, marginTop: 15 }}>
                  <img
                    src={getFoodImage(selected)}
                    alt={selected.name}
                    style={{
                      width: "100%",
                      height: 220,
                      objectFit: "cover",
                      borderRadius: 12
                    }}
                    onError={(e) => handleFoodImageError(e, selected)}
                  />
                  <h2 style={styles.title}>Write a Review</h2>
                  <h3>{selected.name}</h3>
                  <p>📍 {selected.location} · {selected.cuisine}</p>

                  <form onSubmit={submitReview}>
                    <label>Your Rating</label>
                    <select
                      style={styles.input}
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n} Star{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>

                    <label>Your Experience</label>
                    <textarea
                      style={{ ...styles.input, minHeight: 140 }}
                      placeholder="Share your experience..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />

                    <button style={styles.button}>Submit Review</button>
                    <button
                      type="button"
                      style={styles.lightButton}
                      onClick={() => setActive("explore")}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </>
            )}

            {active === "view" && viewingRestaurant && (
              <>
                <button style={styles.lightButton} onClick={() => setActive("explore")}>
                  ← Back to Restaurants
                </button>

                <div style={{ ...styles.card, marginTop: 15 }}>
                  <h2 style={styles.title}>
                    Reviews – {viewingRestaurant.name}
                  </h2>
                  <img
                    src={getFoodImage(viewingRestaurant)}
                    alt={viewingRestaurant.name}
                    style={{
                      width: "100%",
                      maxHeight: 230,
                      objectFit: "cover",
                      borderRadius: 12
                    }}
                    onError={(e) => handleFoodImageError(e, viewingRestaurant)}
                  />
                </div>

                {restaurantReviews.length === 0 ? (
                  <div style={styles.card}>No reviews available yet.</div>
                ) : restaurantReviews.map((r) => (
                  <div key={r._id} style={{ ...styles.card, marginTop: 14 }}>
                    <b style={{ color: C.maroon }}>
                      {r.customer?.name || "Customer"}
                    </b>
                    <p style={{ color: "#ad790d" }}>
                      {"⭐".repeat(r.rating || 0)}
                    </p>
                    <p>{r.comment}</p>

                    {String(r.customer?._id) ===
                      String(user.id || user._id) && (
                      <>
                        <button
                          style={styles.lightButton}
                          onClick={() => setEditingReview({
                            id: r._id,
                            rating: r.rating,
                            comment: r.comment
                          })}
                        >
                          Edit
                        </button>
                        <button
                          style={styles.dangerButton}
                          onClick={() => deleteCustomerReview(r._id)}
                        >
                          Delete
                        </button>

                        {editingReview?.id === r._id && (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              updateReview(
                                editingReview.id,
                                editingReview.rating,
                                editingReview.comment
                              );
                            }}
                          >
                            <select
                              style={styles.input}
                              value={editingReview.rating}
                              onChange={(e) => setEditingReview({
                                ...editingReview,
                                rating: Number(e.target.value)
                              })}
                            >
                              {[5, 4, 3, 2, 1].map((n) => (
                                <option key={n} value={n}>{n} Stars</option>
                              ))}
                            </select>

                            <textarea
                              style={styles.input}
                              value={editingReview.comment}
                              onChange={(e) => setEditingReview({
                                ...editingReview,
                                comment: e.target.value
                              })}
                            />

                            <button style={styles.button}>Save Changes</button>
                            <button
                              type="button"
                              style={styles.lightButton}
                              onClick={() => setEditingReview(null)}
                            >
                              Cancel
                            </button>
                          </form>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </>
            )}

            {active === "myreviews" && (
              <>
                <h2 style={styles.title}>My Reviews</h2>
                <p style={{ color: C.muted }}>
                  Select a restaurant below to view its reviews and manage your own.
                </p>
                <div style={styles.grid}>
                  {restaurants.map((r) => (
                    <div key={r._id} style={styles.card}>
                      <img
                        src={getFoodImage(r)}
                        alt={r.name}
                        style={{
                          width: "100%",
                          height: 150,
                          objectFit: "cover",
                          borderRadius: 10
                        }}
                        onError={(e) => handleFoodImageError(e, r)}
                      />
                      <h3 style={{ color: C.maroon }}>{r.name}</h3>
                      <button
                        style={styles.button}
                        onClick={() => openView(r)}
                      >
                        View Reviews
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* OWNER DASHBOARD */}
        {user.role === "owner" && (
          <>
            {!dashboard.restaurant ? (
              <div style={styles.card}>
                <h2 style={styles.title}>No Restaurant Assigned</h2>
                <p>Please contact the administrator to assign a restaurant.</p>
              </div>
            ) : (
              <>
                {active === "overview" && (
                  <>
                    <div style={{
                      background: `linear-gradient(120deg,${C.dark},${C.maroon})`,
                      color: "white",
                      borderRadius: 16,
                      padding: 26,
                      marginBottom: 23
                    }}>
                      <h1 style={{ margin: "0 0 8px" }}>
                        Welcome, Restaurant Owner
                      </h1>
                      <p style={{ margin: 0, color: "#f2dcb3" }}>
                        Track your restaurant's performance and customer feedback.
                      </p>
                    </div>

                    <h3 style={styles.title}>Restaurant Performance</h3>

                    <div style={{
                      ...styles.card,
                      marginBottom: 20,
                      padding: 0,
                      overflow: "hidden"
                    }}>
                      <img
                        src={getFoodImage(dashboard.restaurant)}
                        alt={dashboard.restaurant.name}
                        style={{
                          width: "100%",
                          height: 230,
                          objectFit: "cover"
                        }}
                        onError={(e) => handleFoodImageError(e, dashboard.restaurant)}
                      />
                      <div style={{ padding: 20 }}>
                        <h2 style={{ color: C.maroon, marginTop: 0 }}>
                          {dashboard.restaurant.name}
                        </h2>
                        <p>📍 {dashboard.restaurant.location}</p>
                        <p>🍴 {dashboard.restaurant.cuisine}</p>
                      </div>
                    </div>

                    <div style={styles.grid}>
                      <StatCard
                        icon="⭐"
                        label="Average Rating"
                        value={Number(
                          dashboard.dashboard?.totalReviews || 0
                        ) > 0
                          ? `${Number(
                              dashboard.dashboard?.averageRating || 0
                            ).toFixed(1)} / 5`
                          : "No ratings yet"}
                      />
                      <StatCard
                        icon="📝"
                        label="Total Reviews"
                        value={dashboard.dashboard?.totalReviews || 0}
                      />
                    </div>
                  </>
                )}

                {active === "restaurant" && (
                  <>
                    <h2 style={styles.title}>My Restaurant</h2>
                    <RestaurantCard
                      restaurant={dashboard.restaurant}
                      distribution={{}}
                      owner
                    />
                  </>
                )}

                {active === "update" && (
                  <div style={{ ...styles.card, maxWidth: 700 }}>
                    <h2 style={styles.title}>Update Restaurant Details</h2>
                    <form onSubmit={updateOwnerRestaurant}>
                      <label>Restaurant Name</label>
                      <input
                        style={styles.input}
                        name="name"
                        defaultValue={dashboard.restaurant.name}
                        required
                      />
                      <label>Location</label>
                      <input
                        style={styles.input}
                        name="location"
                        defaultValue={dashboard.restaurant.location}
                        required
                      />
                      <label>Cuisine</label>
                      <input
                        style={styles.input}
                        name="cuisine"
                        defaultValue={dashboard.restaurant.cuisine}
                        required
                      />
                      <button style={styles.button}>Save Changes</button>
                    </form>
                  </div>
                )}

                {active === "reviews" && (
                  <>
                    <h2 style={styles.title}>Customer Reviews</h2>
                    {(dashboard.reviews || []).length === 0 ? (
                      <div style={styles.card}>No customer reviews yet.</div>
                    ) : dashboard.reviews.map((r) => (
                      <div key={r._id} style={{ ...styles.card, marginBottom: 14 }}>
                        <b style={{ color: C.maroon }}>
                          {r.customer?.name || "Customer"}
                        </b>
                        <p style={{ color: "#ad790d" }}>
                          {"⭐".repeat(r.rating || 0)}
                        </p>
                        <p>{r.comment}</p>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </>
        )}

        <footer style={{
          textAlign: "center",
          color: C.muted,
          borderTop: `1px solid ${C.border}`,
          marginTop: 45,
          padding: 20,
          fontSize: 12
        }}>
          © 2026 Dine & Review · Restaurant Review Platform
        </footer>
      </main>
    </div>
  );
}

export default App;
