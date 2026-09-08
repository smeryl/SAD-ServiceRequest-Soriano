# ICT Service Request Management System

**Course**: Systems Analysis and Design (SAD)  
**Level**: Intermediate Software Development  
**Deployed at**: https://your-username.github.io/SAD-ServiceRequest-YourLastName/

---

## Problem Statement
The university ICT office receives technical concerns through various channels (verbal, text, social media), leading to forgotten or duplicated requests. This system provides a centralized online platform to record, monitor, and manage all service requests.

---

## Actors
- **System User / ICT Personnel** – can log in, create, view, update, delete, search, and filter service requests.

---

## Use Case Diagram
![Use Case Diagram](documentation/use-case-diagram.png)

*(You can also embed a Mermaid diagram – see the `system-analysis.md` file.)*

---

## ERD
![ERD](documentation/erd.png)

---

## Requirements Traceability Matrix

| Req. ID | Requirement | System Feature | Test |
|---------|-------------|----------------|------|
| FR-01 | User can log in | Login Page | TC-01 |
| FR-02 | User can create request | Request Form | TC-02 |
| FR-03 | User can view requests | Request Table | TC-03 |
| FR-04 | User can update request | Edit Function | TC-04 |
| FR-05 | User can delete request | Delete Function | TC-05 |
| FR-06 | User can search | Search Function | TC-06 |
| FR-07 | User can filter | Filter Function | TC-07 |
| FR-08 | System displays summaries | Dashboard | TC-08 |

---

## Testing Results

| Test ID | Scenario | Result |
|---------|----------|--------|
| TC-01 | Login valid account | ✅ PASS |
| TC-02 | Submit valid request | ✅ PASS |
| TC-03 | Display requests | ✅ PASS |
| TC-04 | Modify request | ✅ PASS |
| TC-05 | Delete request | ✅ PASS |
| TC-06 | Search requester | ✅ PASS |
| TC-07 | Filter Pending | ✅ PASS |
| TC-08 | Deployed URL loads | ✅ PASS |

---

## Technologies
- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Backend**: Supabase (PostgreSQL + Auth)
- **Deployment**: GitHub Pages
- **Version Control**: Git & GitHub

---

## Local Development
1. Clone the repo: `git clone https://github.com/your-username/SAD-ServiceRequest-YourLastName.git`
2. Replace `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `js/supabase.js` with your own.
3. Open `login.html` in a browser or use Live Server in VS Code.

---

## Author
[Your Name] – BSIS-3A
