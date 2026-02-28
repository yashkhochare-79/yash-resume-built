import streamlit as st

# Page Config
st.set_page_config(
    page_title="Yash | Portfolio",
    page_icon="🚀",
    layout="wide"
)

# Custom CSS for Premium Look
st.markdown("""
    <style>
        .main {
            background-color: #0E1117;
        }
        h1, h2, h3 {
            color: #00ADB5;
        }
        .stButton>button {
            background-color: #00ADB5;
            color: white;
            border-radius: 8px;
            padding: 0.5em 1em;
        }
        .stDownloadButton>button {
            background-color: #222831;
            color: white;
            border-radius: 8px;
        }
    </style>
""", unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.image("https://cdn-icons-png.flaticon.com/512/3135/3135715.png", width=150)
    st.title("Yash")
    st.write("Full Stack Developer 🚀")
    st.write("---")
    st.write("📍 Mumbai, India")
    st.write("📧 yash@email.com")
    st.write("🔗 LinkedIn")
    st.write("💻 GitHub")

# Main Section
st.title("👋 Hi, I'm Yash")

st.write("""
I am a passionate developer focused on building modern web applications and AI-powered tools.
Currently exploring Machine Learning and Full Stack Development.
""")

st.write("---")

# Skills Section
st.header("🛠 Skills")

col1, col2, col3 = st.columns(3)

with col1:
    st.subheader("Frontend")
    st.write("- HTML")
    st.write("- CSS")
    st.write("- React")

with col2:
    st.subheader("Backend")
    st.write("- Python")
    st.write("- FastAPI")
    st.write("- Streamlit")

with col3:
    st.subheader("Database")
    st.write("- MySQL")
    st.write("- Supabase")

st.write("---")

# Projects Section
st.header("🚀 Projects")

st.subheader("1️⃣ AI Resume Builder")
st.write("A smart resume generator using modern UI & backend logic.")

st.subheader("2️⃣ Machine Learning Predictor")
st.write("Predictive ML app deployed using Streamlit.")

st.write("---")

# Download Resume Button
st.header("📄 Download Resume")

resume_text = """
Yash
Full Stack Developer

Skills:
- Python
- React
- Machine Learning
"""

st.download_button(
    label="Download Resume",
    data=resume_text,
    file_name="Yash_Resume.txt",
    mime="text/plain"
)

st.write("---")
st.write("© 2026 Yash | Built with Streamlit ❤️")