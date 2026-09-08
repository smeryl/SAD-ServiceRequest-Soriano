# System Analysis Document

## 1. Problem Statement
The ICT Office of the university receives technical support requests through multiple informal channels. This results in lost, duplicated, or unmonitored concerns. The proposed system provides a single online platform where authorized personnel can log, track, and manage all service requests efficiently.

## 2. Actors
- **System User / ICT Personnel**: Primary actor who performs all CRUD operations after authentication.

## 3. Use Case Diagram (Mermaid)

```mermaid
graph TD
    User((User))
    User -->|Login| Login[Login]
    User -->|View Dashboard| Dashboard[View Dashboard]
    User -->|Create Request| Create[Create Request]
    User -->|View Requests| View[View Requests]
    User -->|Search Request| Search[Search Request]
    User -->|Filter Requests| Filter[Filter Requests]
    User -->|Update Request| Update[Update Request]
    User -->|Delete Request| Delete[Delete Request]
    User -->|Logout| Logout[Logout]

    subgraph "Service Request System"
        Login
        Dashboard
        Create
        View
        Search
        Filter
        Update
        Delete
        Logout
    end
