import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, AnimatePresence, MotionValue, useTransform } from 'framer-motion';

const Dash = ({ index, scrollYProgress, totalDashes }: { index: number, scrollYProgress: MotionValue<number>, totalDashes: number }) => {
  const backgroundColor = useTransform(scrollYProgress, (val: number) => {
    const currentIndex = Math.min(totalDashes - 1, Math.max(0, Math.floor(val * totalDashes)));
    return currentIndex === index ? "#0E1C29" : "#D1D5DB";
  });

  return (
    <motion.div
      style={{ backgroundColor }}
      className="w-5 h-[3px] rounded-full"
    />
  );
};

import Footer from '../footer';
import { Navbar, TopNavbar } from '@/components/sections/navigation';
import HomeImage from '@/assert/home/Image.svg';
import Group1Svg from "@/assert/Group 1.svg";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

type ContentBlock = {
  type: 'h2' | 'p' | 'quote' | 'code';
  text: string;
  lang?: string;
};

interface BlogData {
  id: number;
  title: string;
  description: string;
  src: string;
  link: string;
  blogUrl: string;
  color: string;
  author: string;
  date: string;
  readTime: string;
  content: ContentBlock[];
}

const blogsData: BlogData[] = [
  {
    id: 1,
    title: 'How I Built a Real-Time Multiplayer Coding Platform',
    description: 'Architecture, WebSockets & Scalability — the engineering decisions behind Clash of Code, a platform where users join contests, collaborate, submit code, and see changes in real time.',
    src: 'rock.jpg',
    link: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1200&auto=format&fit=crop',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#5196fd',
    author: 'Gowtham',
    date: 'Oct 12, 2026',
    readTime: '12 min read',
    content: [
      { type: 'p', text: "Building a coding platform is relatively straightforward when a single user is solving a problem. Building one where multiple users can join the same contest, communicate, collaborate, submit code, receive results, and see changes in real time is a completely different engineering problem." },
      { type: 'p', text: "That was the challenge behind Clash of Code. The project started as a full-stack application, but as I added real-time collaboration, matchmaking, code execution, and competitive features, I had to think beyond CRUD APIs." },
      { type: 'h2', text: "1. The Problem" },
      { type: 'p', text: "A traditional web application follows a simple request-response model. This works well for dashboards and blogs. A multiplayer coding platform has a different requirement — when one user joins a room, submits code, or changes their status, other users need to know immediately. Polling the server is possible, but it introduces unnecessary latency. I needed the server to push events to connected clients. That led me to WebSockets." },
      { type: 'code', lang: 'text', text: "Client\n   ↓\nHTTP Request\n   ↓\nBackend\n   ↓\nDatabase\n   ↓\nHTTP Response" },
      { type: 'h2', text: "2. High-Level Architecture" },
      { type: 'p', text: "The system evolved into several independent components. The key architectural decision was separating different responsibilities instead of putting everything inside one backend process." },
      { type: 'p', text: "At the center sits a Node.js API layer paired with Socket.io, handling both stateless REST requests and persistent WebSocket connections. Behind it, PostgreSQL stores durable state — users, contests, submissions — while Redis handles anything ephemeral: presence, pub/sub events, and matchmaking queues. Code execution is pushed entirely outside this loop into Judge0, which runs inside its own Docker containers. Nothing about executing untrusted code ever touches the same process as the API." },
      { type: 'h2', text: "3. Why WebSockets?" },
      { type: 'p', text: "HTTP is fundamentally request-driven. With WebSockets, the communication channel stays open and the server can proactively push events. For a multiplayer application, this model is far superior." },
      { type: 'code', lang: 'javascript', text: "// Emit to a specific user\nsocket.emit(\"contest-started\", contest);\n\n// Broadcast to everyone in a contest room\nio.to(contestId).emit(\"contest-update\", data);" },
      { type: 'h2', text: "4. Room-Based Communication" },
      { type: 'p', text: "Each contest has its own Socket.io room. When a participant joins a contest, they join that room. The server broadcasts only to participants in that specific contest, preventing cross-contamination of events between different rooms." },
      { type: 'code', lang: 'javascript', text: "// User joins a contest\nsocket.join(contestId);\n\n// Server notifies only that contest's participants\nio.to(contestId).emit(\"player-joined\", player);" },
      { type: 'h2', text: "5. Code Execution as a Separate Concern" },
      { type: 'p', text: "The application cannot safely execute user-submitted source code on the main API server. A submission might consume excessive CPU, memory, or execution time. Code execution is isolated through Judge0, which runs code inside Docker containers, completely separated from the main API process." },
      { type: 'h2', text: "6. Scaling Beyond a Single Server" },
      { type: 'p', text: "WebSocket connections are stateful. User A might be connected to Server A while User B is on Server B. If Server A receives an event, Server B needs to know. Redis becomes a shared pub/sub coordination layer between all server instances." },
      { type: 'p', text: "In practice, this looks like a load balancer in front of several identical Node.js instances, each one a thin, disposable process. None of them hold authoritative state in memory. When one server needs to reach a user connected elsewhere, it publishes to Redis; every other instance is subscribed and re-emits the event to its own local sockets. The result is a fleet of servers that behave, from the outside, like a single logical one — and any instance can be killed or restarted without a user ever noticing." },
      { type: 'h2', text: "7. Asynchronous Code Execution" },
      { type: 'p', text: "Not every operation should block an HTTP request. Code execution is enqueued as a background job. A worker picks it up, executes it, stores the result, then notifies the client via WebSocket when done." },
      { type: 'code', lang: 'text', text: "Request → Create Job → Queue\n   ↓\nWorker → Execute Code → Store Result\n   ↓\nNotify Client via WebSocket" },
      { type: 'quote', text: "Real-time applications are not simply REST APIs with WebSockets added on top. They require thinking about state, concurrency, failure recovery, and communication patterns." },
      { type: 'h2', text: "8. Key Lessons" },
      { type: 'p', text: "Building Clash of Code changed how I approach backend development. I started thinking about features. As the system grew, I started thinking in terms of communication, state, concurrency, isolation, scalability, and failure. That shift — from implementing features to designing systems — is the most valuable thing I learned from this project." }
    ]
  },
  {
    id: 2,
    title: 'What Happens When 100 Users Submit Code at the Same Time?',
    description: 'Designing a scalable code execution system — CPU consumption, memory, concurrency, queues, isolation, timeouts, and the architecture decisions behind a production-grade coding platform.',
    src: 'tree.jpg',
    link: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&auto=format&fit=crop&q=60',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#8f89ff',
    author: 'Gowtham',
    date: 'Oct 8, 2026',
    readTime: '10 min read',
    content: [
      { type: 'p', text: "A coding platform looks simple from the user's perspective. You write code, click Run, and wait for the result. But behind that button is a much more interesting engineering problem." },
      { type: 'p', text: "What happens when one user submits code? That is easy. What happens when 100 users submit code at almost the same time? Now we have to think about CPU consumption, memory, concurrency, queues, isolation, timeouts, failures, and scalability." },
      { type: 'h2', text: "1. The Simplest Architecture" },
      { type: 'p', text: "The first architecture that comes to mind sends every submission directly through the backend. But imagine the backend receives 100 submissions simultaneously — it must handle HTTP requests, authentication, database access, WebSocket connections, AND execute potentially expensive workloads all at once. Code execution should not compete with normal application traffic." },
      { type: 'code', lang: 'text', text: "User\n  ↓\nBackend API\n  ↓\nExecute Code\n  ↓\nReturn Result" },
      { type: 'h2', text: "2. Separate the Execution Layer" },
      { type: 'p', text: "The solution is to establish a clear architectural boundary. The main API handles application logic. A dedicated execution layer handles the expensive workload. This separation means a CPU-intensive submission can never starve normal API traffic." },
      { type: 'h2', text: "3. Why Executing User Code Is Different" },
      { type: 'p', text: "Running code submitted by users requires isolation. An infinite loop, memory exhaustion, or filesystem access could damage the host server. The execution environment needs time limits, memory limits, process isolation, filesystem restrictions, and resource quotas." },
      { type: 'code', lang: 'cpp', text: "// A simple hostile submission\nwhile(true) {\n  // Consumes CPU indefinitely without limits\n}" },
      { type: 'h2', text: "4. Introducing a Queue" },
      { type: 'p', text: "A queue gives us a buffer between incoming requests and execution workers. The API accepts the request and creates a job immediately. Workers then process jobs according to available capacity. This decouples demand from processing speed." },
      { type: 'p', text: "The API server's only job here is to validate the submission and drop it onto a queue — it never waits around for the result. A separate pool of workers pulls jobs off that queue at whatever pace their capacity allows, routing each one through Judge0 and its Docker sandbox. If traffic spikes, the queue simply grows; nothing upstream blocks, and no single burst of submissions can take down the API." },
      { type: 'h2', text: "5. Why a Queue Helps" },
      { type: 'p', text: "Suppose 100 users submit code simultaneously but only 10 workers are available. Instead of crashing or timing out, 10 jobs begin processing while 90 wait. As each worker finishes, it picks up the next job. The queue acts as a pressure valve between demand and capacity." },
      { type: 'code', lang: 'text', text: "Incoming: 100 submissions\nWorkers:  10 concurrent\n\nProcessing: 10\nWaiting:    90\n\n→ Worker completes job 1 → picks up job 11\n→ Worker completes job 2 → picks up job 12" },
      { type: 'h2', text: "6. Using Judge0" },
      { type: 'p', text: "For Clash of Code, I used Judge0 as the execution layer. A submission carries source code, a language ID, and stdin. Judge0 returns stdout, stderr, status, execution time, and memory usage. The backend converts this into an application-level response." },
      { type: 'code', lang: 'json', text: "{\n  \"source_code\": \"print(input())\",\n  \"language_id\": 71,\n  \"stdin\": \"Hello World\"\n}" },
      { type: 'h2', text: "7. The Complete Execution Pipeline" },
      { type: 'p', text: "Putting it all together, the full pipeline separates every major responsibility. The API handles request acceptance. The queue buffers demand. Workers manage execution throughput. Judge0 handles isolation. WebSockets deliver results in real time without the client polling." },
      { type: 'p', text: "End to end, a single submission travels through six distinct hand-offs — client, API, queue, worker, Judge0, and finally back out through a WebSocket push — and each one is a natural seam where the system can be scaled, monitored, or replaced independently. That seam-by-seam separation is what let this pipeline handle real contest traffic without a single component becoming a bottleneck." },
      { type: 'h2', text: "8. Handling Failures" },
      { type: 'p', text: "Distributed systems should assume that failures will happen. A worker might crash. Judge0 might be temporarily unavailable. A submission might exceed its time limit. Every submission needs explicit states that can be monitored and debugged." },
      { type: 'code', lang: 'text', text: "QUEUED → RUNNING → COMPLETED\n             ↓\n           FAILED\n             ↓\n    TIME_LIMIT_EXCEEDED" },
      { type: 'h2', text: "9. Rate Limiting" },
      { type: 'p', text: "A malicious client could flood the execution system with hundreds of submissions. Rate limiting controls how frequently a user can create execution jobs, protecting the infrastructure from deliberate or accidental abuse." },
      { type: 'h2', text: "10. Key Lessons" },
      { type: 'quote', text: "Scalability is not simply about adding more servers. It is about isolating workloads, controlling concurrency, managing failures, and designing each component around a single responsibility." },
      { type: 'p', text: "This project changed how I think about scalability. Previously, I thought: 'Can the application handle this request?' Now I think: 'What happens when the same request arrives 1,000 times simultaneously?' That shift in perspective is the most important engineering lesson I took away from building Clash of Code." }
    ]
  },
  {
    id: 3,
    title: 'From localhost to AWS: What I Learned Deploying a Full-Stack Application',
    description: 'A practical engineering case study covering EC2, RDS, S3, networking, environment configuration, WebSockets, security, scaling, debugging, and cloud cost decisions.',
    src: 'water.jpg',
    link: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#4f9cf9',
    author: 'Gowtham',
    date: 'Sep 28, 2026',
    readTime: '12 min read',
    content: [
      { type: 'p', text: "There is a big difference between building an application and running an application. On localhost, the frontend, backend, and database can feel like one system. The moment an application is deployed, networking, security, configuration, persistence, observability, and cost become part of the engineering problem." },
      { type: 'p', text: "While deploying my full-stack multiplayer coding platform, I worked through these concerns using AWS. The most useful part was not simply getting the application online. It was learning what localhost had been hiding from me." },
      { type: 'quote', text: "Deployment is not the final step after development. It is another layer of system design." },
      { type: 'h2', text: "1. The Localhost Architecture" },
      { type: 'code', lang: 'text', text: "Developer Machine\n\nFrontend\n   ↓\nBackend\n   ↓\nPostgreSQL" },
      { type: 'p', text: "This environment is convenient because the services are close together and infrastructure constraints are mostly invisible. A local database is immediately reachable, ports are easy to open, and the application and dependencies share the same machine." },
      { type: 'h2', text: "2. Separating Production Responsibilities" },
      { type: 'code', lang: 'text', text: "                    Internet\n                       │\n                       ▼\n                  Frontend\n                       │\n                 HTTPS / API\n                       │\n                       ▼\n                 EC2 Node.js\n                  /    |    \\\n                 /     |     \\\n                ▼      ▼      ▼\n              RDS      S3    Redis\n           PostgreSQL  Files   Cache" },
      { type: 'p', text: "The production architecture separated compute, relational data, object storage, and caching. Each component had a specific responsibility instead of making one virtual machine responsible for everything." },
      { type: 'h2', text: "3. Why EC2 for the Backend?" },
      { type: 'p', text: "The Node.js backend is a long-running application process. EC2 gave me a virtual server where I could control the runtime environment and deploy the API. That control also introduced responsibilities that localhost had hidden: operating-system configuration, Node.js versions, process management, ports, logs, environment variables, restart behavior, and server security." },
      { type: 'h2', text: "4. Security Groups and Network Access" },
      { type: 'p', text: "On localhost, it is easy to think only in terms of port numbers. In AWS, network access needs to be explicit. Security groups define which inbound traffic is permitted to reach the infrastructure." },
      { type: 'code', lang: 'text', text: "Internet\n   │\n   ▼\nSecurity Group\n   │\n   ├── Allowed application traffic\n   └── Restricted ports\n          │\n          ▼\n         EC2" },
      { type: 'p', text: "The principle is simple: expose only what the application needs. Infrastructure security starts with reducing unnecessary network exposure." },
      { type: 'h2', text: "5. Why Separate PostgreSQL with RDS?" },
      { type: 'p', text: "Running PostgreSQL on the same EC2 instance as the backend is possible, but it couples application compute and database infrastructure. I used RDS to establish a cleaner operational boundary." },
      { type: 'code', lang: 'text', text: "Application Server\n      │\n      │ Database Connection\n      ▼\n RDS PostgreSQL\n      │\n      ▼\n Persistent Data" },
      { type: 'p', text: "This does not automatically make the application highly available, but it creates a better operational boundary. The API and database can be managed, monitored, and scaled independently." },
      { type: 'h2', text: "6. Why Object Storage Belongs Outside the Database" },
      { type: 'p', text: "Files such as images and uploads have different storage characteristics from relational records. S3 provides object storage while PostgreSQL can retain metadata such as the owner, file name, object key, and creation time." },
      { type: 'code', lang: 'text', text: "PostgreSQL\n ├── user_id\n ├── file_name\n ├── object_key\n └── created_at\n\nS3\n └── Actual file bytes" },
      { type: 'h2', text: "7. Environment Variables" },
      { type: 'p', text: "Production introduced a clear distinction between code and configuration. Database URLs, JWT secrets, cloud credentials, and environment-specific endpoints should not be hard-coded into source files." },
      { type: 'code', lang: 'javascript', text: "const databaseUrl = process.env.DATABASE_URL;\nconst jwtSecret = process.env.JWT_SECRET;\nconst apiUrl = process.env.NEXT_PUBLIC_API_URL;" },
      { type: 'p', text: "The same application code can then operate in different environments while the configuration changes outside the codebase." },
      { type: 'h2', text: "8. WebSockets Make Deployment Stateful" },
      { type: 'p', text: "A normal REST request can finish quickly and disappear. A WebSocket connection may remain open for a long time. Because the platform uses Socket.io, deployment also needs to account for persistent connections and, when multiple instances are introduced, shared real-time coordination." },
      { type: 'h2', text: "9. Debugging Production Is Different" },
      { type: 'p', text: "A frontend error such as 'Failed to fetch' does not identify the root cause. The actual problem could be an incorrect API URL, CORS, DNS, network access, a blocked port, a crashed process, or a database connection failure." },
      { type: 'code', lang: 'text', text: "Client\n  ↓\nNetwork\n  ↓\nServer\n  ↓\nApplication\n  ↓\nDatabase" },
      { type: 'p', text: "I learned to debug from the outside inward instead of changing configuration randomly. First establish whether the request reaches the intended server, then inspect application logs, and finally inspect downstream dependencies." },
      { type: 'h2', text: "10. Cost Is an Engineering Constraint" },
      { type: 'p', text: "Cloud architecture is not only about performance. Every managed service, instance, database configuration, and additional layer has an operational cost. A small application does not automatically need a large enterprise architecture." },
      { type: 'p', text: "For a student project, the right question is often: what level of reliability, performance, and operational complexity does this workload actually require? Infrastructure should match the workload rather than technology choices being made for appearance." },
      { type: 'h2', text: "11. Scaling the Architecture" },
      { type: 'code', lang: 'text', text: "                  Users\n                    │\n                    ▼\n              Load Balancer\n               /        \\\n              ▼          ▼\n           EC2 #1     EC2 #2\n              \\          /\n               \\        /\n                Shared Services\n                 /    |    \\\n                ▼     ▼     ▼\n              RDS   Redis    S3" },
      { type: 'p', text: "Once multiple API servers exist, new problems appear: shared state, WebSocket coordination, database connection limits, centralized logging, and distributed caching. Scaling one layer often creates requirements in another layer." },
      { type: 'h2', text: "12. What I Would Improve Next" },
      { type: 'p', text: "The next improvements I would explore are automated CI/CD with GitHub Actions, infrastructure as code with Terraform, centralized logs, metrics with Prometheus and Grafana, distributed tracing, automated health checks, load testing, stronger secret management, and safer rollback strategies." },
      { type: 'h2', text: "13. What AWS Changed in My Thinking" },
      { type: 'p', text: "Before deployment, I mostly thought about software as frontend, backend, and database. Cloud deployment expanded that model into compute, networking, security, storage, observability, reliability, and cost." },
      { type: 'quote', text: "A working application is only one part of the system. Running it reliably for real users is another engineering problem." },
      { type: 'h2', text: "Conclusion" },
      { type: 'p', text: "Moving the project from localhost to AWS taught me that deployment should be considered during architecture rather than after the application is finished. The experience forced me to understand how software behaves when it leaves the controlled environment of a developer machine and starts interacting with real infrastructure." }
    ]
  },
  {
    id: 4,
    title: 'PostgreSQL at Scale: Database Design Decisions That Matter Before Your Application Grows',
    description: 'A practical guide to relational modeling, normalization, constraints, indexes, transactions, query planning, concurrency, connection pooling, and database bottlenecks.',
    src: 'house.jpg',
    link: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&auto=format&fit=crop',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#5b8def',
    author: 'Gowtham',
    date: 'Sep 24, 2026',
    readTime: '13 min read',
    content: [
      { type: 'p', text: "When building a backend application, it is easy to focus on APIs first: create an endpoint, return JSON, connect it to a database, and move on. The design starts becoming interesting when the database has to preserve relationships, enforce business invariants, and support increasingly important queries." },
      { type: 'p', text: "Working with PostgreSQL across my projects changed the question I ask when designing a schema. Instead of asking only what tables I need, I ask what the domain looks like, how the data relates, which invariants must always hold, and how the application will access that data." },
      { type: 'quote', text: "Good database design is not only about storing data. It is about preserving meaning while making access predictable and efficient." },
      { type: 'h2', text: "1. Start With the Domain" },
      { type: 'p', text: "Before writing SQL, identify the business entities. In an e-commerce system, these might include Customer, Vendor, Product, Cart, CartItem, Order, OrderItem, and Payment." },
      { type: 'code', lang: 'text', text: "Customer\n   │\n   │ 1:N\n   ▼\n Order\n   │\n   │ 1:N\n   ▼\nOrderItem\n   │\n   │ N:1\n   ▼\nProduct" },
      { type: 'p', text: "This relationship-first approach makes the database represent the domain rather than simply mirroring the screens of the frontend." },
      { type: 'h2', text: "2. Many-to-Many Relationships Need a Model" },
      { type: 'p', text: "An order can contain many products, while a product can appear in many orders. Instead of forcing a many-to-many relationship directly into either table, OrderItem becomes the association entity." },
      { type: 'code', lang: 'text', text: "Order\n  │\n  ▼\nOrderItem\n  │\n  ▼\nProduct" },
      { type: 'p', text: "OrderItem can contain quantity and the price associated with that particular purchase. It is not just a technical junction table; it represents a meaningful business concept." },
      { type: 'h2', text: "3. Historical Values Matter" },
      { type: 'p', text: "Suppose a product costs ₹65,000 today and ₹70,000 next month. An old order should not change simply because the current product price changed. The transaction needs its own historical price." },
      { type: 'code', lang: 'text', text: "Product\n └── current_price\n\nOrderItem\n └── price_at_purchase" },
      { type: 'h2', text: "4. Normalization Without Blind Rules" },
      { type: 'p', text: "Normalization reduces unnecessary duplication. Instead of storing customer name, email, and phone on every order row, a Customer table can hold those attributes while Order references the customer through a foreign key." },
      { type: 'code', lang: 'sql', text: "CREATE TABLE orders (\n    id BIGSERIAL PRIMARY KEY,\n    customer_id BIGINT NOT NULL,\n    created_at TIMESTAMP NOT NULL,\n    FOREIGN KEY (customer_id)\n        REFERENCES customers(id)\n);" },
      { type: 'p', text: "But normalization is not the entire story. Historical snapshots and carefully chosen denormalization can be correct when they preserve business meaning or solve a measured performance problem." },
      { type: 'h2', text: "5. Constraints Protect Data Integrity" },
      { type: 'code', lang: 'sql', text: "CREATE TABLE users (\n    id BIGSERIAL PRIMARY KEY,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    name VARCHAR(100) NOT NULL\n);" },
      { type: 'p', text: "Primary keys, unique constraints, not-null constraints, check constraints, and foreign keys make invalid states harder to create even when an application bug slips through." },
      { type: 'h2', text: "6. Indexes Follow Query Patterns" },
      { type: 'p', text: "Indexes are not decorations added to every column. They exist to accelerate meaningful access patterns. If an application frequently asks for orders belonging to a customer, an index on customer_id may be appropriate." },
      { type: 'code', lang: 'sql', text: "CREATE INDEX idx_orders_customer_id\nON orders(customer_id);\n\nSELECT *\nFROM orders\nWHERE customer_id = 100;" },
      { type: 'p', text: "Indexes consume storage and create write-maintenance overhead. The right index depends on the queries, data distribution, selectivity, and workload." },
      { type: 'h2', text: "7. Composite Indexes" },
      { type: 'code', lang: 'sql', text: "SELECT *\nFROM submissions\nWHERE contest_id = 10\nORDER BY created_at DESC\nLIMIT 20;\n\nCREATE INDEX idx_submissions_contest_created\nON submissions(contest_id, created_at DESC);" },
      { type: 'p', text: "The order of columns in a composite index matters. Index design should therefore follow the actual query workload rather than generic rules." },
      { type: 'h2', text: "8. EXPLAIN ANALYZE Instead of Guessing" },
      { type: 'code', lang: 'sql', text: "EXPLAIN ANALYZE\nSELECT *\nFROM submissions\nWHERE contest_id = 10;" },
      { type: 'p', text: "This helps identify sequential scans, index scans, joins, estimated rows, actual rows, and execution time. Query optimization becomes an evidence-driven process instead of guesswork." },
      { type: 'h2', text: "9. Transactions Protect Multi-Step Operations" },
      { type: 'code', lang: 'text', text: "BEGIN\n  ↓\nCreate Order\n  ↓\nCreate OrderItems\n  ↓\nUpdate Inventory\n  ↓\nCOMMIT\n\nIf a required step fails:\nROLLBACK" },
      { type: 'p', text: "Transactions provide atomicity for operations that must be treated as a unit. The correct transaction boundary depends on the business operation and consistency requirements." },
      { type: 'h2', text: "10. Concurrency in Multiplayer Systems" },
      { type: 'p', text: "The same database principles apply to matchmaking and contest state. If two users attempt to consume the same available slot at nearly the same time, both may observe the same state unless the operation is designed for concurrency." },
      { type: 'p', text: "Transactions, locking, atomic operations, and isolation levels are tools for controlling these race conditions. The correct mechanism depends on whether the application needs strict serial behavior, optimistic concurrency, or another consistency model." },
      { type: 'h2', text: "11. PostgreSQL Beyond CRUD" },
      { type: 'p', text: "PostgreSQL becomes much more interesting when used for analytical and application-specific queries. Window functions, common table expressions, JSONB, full-text search, views, and extensions can solve problems without immediately introducing another database technology." },
      { type: 'code', lang: 'sql', text: "SELECT\n    user_id,\n    score,\n    RANK() OVER (\n        ORDER BY score DESC\n    ) AS ranking\nFROM contest_scores;" },
      { type: 'h2', text: "12. Connection Pooling" },
      { type: 'code', lang: 'text', text: "API Requests\n      │\n      ▼\nConnection Pool\n   /   |   \\\n  ▼    ▼    ▼\n DB   DB   DB" },
      { type: 'p', text: "Connection pooling limits the number of active database connections and allows requests to reuse them. This becomes especially important when multiple backend instances share the same PostgreSQL database." },
      { type: 'h2', text: "13. The Database Can Become the Bottleneck" },
      { type: 'code', lang: 'text', text: "                 Load Balancer\n                 /     |     \\\n                ▼      ▼      ▼\n             API 1   API 2   API 3\n                \\      |      /\n                 \\     |     /\n                  PostgreSQL" },
      { type: 'p', text: "Adding more API servers does not automatically increase database capacity. Query optimization, indexing, caching, batching, connection-pool tuning, read replicas, partitioning, or architectural changes may be appropriate depending on the measured bottleneck." },
      { type: 'h2', text: "14. Designing the Database for Clash of Code" },
      { type: 'code', lang: 'text', text: "User\n ├── ContestParticipation\n ├── TeamMembership\n └── Submission\n\nContest\n ├── Problems\n ├── Teams\n └── Submissions\n\nProblem\n └── TestCases\n\nSubmission\n └── ExecutionResult" },
      { type: 'p', text: "Giving each concept a clear responsibility makes the schema easier to reason about as features are added. The database becomes a model of the domain instead of a collection of fields created to satisfy individual screens." },
      { type: 'h2', text: "15. What I Learned" },
      { type: 'quote', text: "The question is not simply 'How do I store this data?' It is 'How should this data be modeled, protected, accessed, and scaled?'" },
      { type: 'p', text: "Database engineering sits at the intersection of data modeling and system behavior. Schema design, constraints, indexes, transactions, connection management, and query planning all influence how the application behaves under real workloads." }
    ]
  },
  {
    id: 5,
    title: 'From REST APIs to Distributed Systems: What Changes When Your Application Starts Growing?',
    description: 'A system-design journey through caching, queues, load balancing, horizontal scaling, observability, and the trade-offs that appear when a simple backend becomes a distributed application.',
    src: 'cactus.jpg',
    link: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop',
    blogUrl: 'https://medium.com/@gowthams200521',
    color: '#7c6ff2',
    author: 'Gowtham',
    date: 'Sep 20, 2026',
    readTime: '12 min read',
    content: [
      { type: 'p', text: "A small application can often be built as a single backend connected to a database. That architecture is simple, understandable, and frequently the right place to start. The interesting question is what changes when the workload grows." },
      { type: 'p', text: "Through my work with Node.js, PostgreSQL, Redis, WebSockets, Docker, AWS, and asynchronous workers, I have started viewing system design as a sequence of bottlenecks rather than a race to introduce microservices." },
      { type: 'quote', text: "Distributed architecture should be a response to constraints, not a collection of fashionable components." },
      { type: 'h2', text: "1. Start With a Simple System" },
      { type: 'code', lang: 'text', text: "Client\n  ↓\nMonolithic API\n  ↓\nPostgreSQL" },
      { type: 'p', text: "This design has a major advantage: it is easy to understand. One deployment contains the application logic, one database contains the state, and requests follow a predictable path." },
      { type: 'h2', text: "2. The First Bottleneck: Database Load" },
      { type: 'p', text: "As traffic increases, the database often becomes a shared bottleneck. Repeated reads of the same data can create unnecessary load, especially when the data changes less frequently than it is requested." },
      { type: 'h2', text: "3. Caching" },
      { type: 'code', lang: 'text', text: "Client\n  ↓\nAPI\n  ↓\nRedis ── cache hit ──→ Response\n  │\n  └── cache miss ──→ PostgreSQL" },
      { type: 'p', text: "Caching can reduce repeated database reads when the data has a suitable consistency model. Redis can store frequently accessed values so that some requests follow a shorter path." },
      { type: 'p', text: "Caching is not free. It introduces invalidation, expiration, memory limits, and consistency decisions. The correct question is not whether Redis can cache something, but whether caching improves the actual workload." },
      { type: 'h2', text: "4. The Second Bottleneck: Expensive Work" },
      { type: 'p', text: "Some operations take significantly longer than a normal API request: code execution, file processing, report generation, image processing, or large data transformations." },
      { type: 'code', lang: 'text', text: "HTTP Request\n     ↓\nExpensive Work\n     ↓\nLong Response Time\n     ↓\nPoor Resource Utilization" },
      { type: 'h2', text: "5. Queues Create Backpressure" },
      { type: 'code', lang: 'text', text: "Requests\n   ↓\n┌──────────────┐\n│     Queue    │\n└──────┬───────┘\n       │\n  ┌────┼────┐\n  ▼    ▼    ▼\n W1    W2    W3" },
      { type: 'p', text: "A queue gives the system a controlled way to absorb bursts. Workers consume jobs according to available capacity. This prevents a sudden increase in demand from automatically becoming a sudden increase in concurrent expensive work." },
      { type: 'h2', text: "6. Horizontal Scaling" },
      { type: 'p', text: "Eventually one API process may not be enough. Instead of making one machine increasingly large, multiple identical application instances can run behind a load balancer." },
      { type: 'code', lang: 'text', text: "                 Load Balancer\n                /      |      \\\n               ▼       ▼       ▼\n            API #1   API #2   API #3\n               \\       |       /\n                \\      |      /\n                 Shared Services" },
      { type: 'p', text: "Horizontal scaling works best when application instances are stateless. Persistent state should live in shared systems such as databases, caches, object storage, or queues rather than inside one server's memory." },
      { type: 'h2', text: "7. Statelessness Changes the Deployment Model" },
      { type: 'p', text: "If Server A stores important session state only in memory, a request routed to Server B may not have access to it. Shared state removes that dependency and makes instances more disposable." },
      { type: 'h2', text: "8. WebSockets Add Another Dimension" },
      { type: 'p', text: "Persistent WebSocket connections introduce state at the connection layer even when application state is stored elsewhere. With multiple servers, events may need to cross instance boundaries." },
      { type: 'code', lang: 'text', text: "User A → API #1 ─┐\n                  ├→ Redis Pub/Sub → API #2 → User B\nUser B → API #2 ─┘" },
      { type: 'h2', text: "9. When Microservices Enter the Conversation" },
      { type: 'p', text: "Microservices can provide independent deployment and scaling boundaries, but they also introduce operational complexity: service discovery, network failures, distributed tracing, authentication between services, versioning, and more difficult debugging." },
      { type: 'p', text: "I would avoid splitting a system into services merely to make an architecture diagram look sophisticated. A service boundary should exist because a workload, ownership boundary, scaling requirement, or deployment constraint justifies it." },
      { type: 'h2', text: "10. Observability Becomes Essential" },
      { type: 'code', lang: 'text', text: "Request\n  ↓\nAPI ──→ Redis\n  │\n  ├──→ PostgreSQL\n  │\n  └──→ Queue ──→ Worker ──→ External Service\n\nTrace ID connects the whole path." },
      { type: 'p', text: "Metrics, structured logs, and distributed traces make the behavior of a distributed system visible. Tools such as Prometheus, Grafana, OpenTelemetry, and Jaeger can become useful as the architecture grows." },
      { type: 'h2', text: "11. Reliability Is a Design Property" },
      { type: 'p', text: "A distributed system assumes that components can fail independently. A database can be slow. A queue can accumulate jobs. A worker can crash. A network call can time out." },
      { type: 'code', lang: 'text', text: "Request\n  ↓\nService A\n  ↓ timeout?\nService B\n  ↓\nRetry / Fail / Fallback" },
      { type: 'p', text: "Retries, timeouts, idempotency, dead-letter queues, and graceful degradation are tools for managing these failure modes. They should be introduced according to actual requirements rather than added mechanically." },
      { type: 'h2', text: "12. The Architecture I Am Building Toward" },
      { type: 'code', lang: 'text', text: "                    Clients\n                       │\n                       ▼\n                 Load Balancer\n                       │\n              ┌────────┴────────┐\n              ▼                 ▼\n           API #1            API #2\n              │                 │\n       ┌──────┼─────────────────┤\n       ▼      ▼                 ▼\n     Redis  PostgreSQL        Queue\n                                 │\n                          ┌──────┼──────┐\n                          ▼      ▼      ▼\n                        Worker Worker Worker\n                          │\n                       Docker / Judge0" },
      { type: 'p', text: "This architecture is not a claim that every application needs all of these components. It is a collection of patterns I have encountered while solving concrete problems in my own projects." },
      { type: 'h2', text: "13. What I Learned About System Design" },
      { type: 'quote', text: "Good system design is not about having the most components. It is about knowing why each component exists." },
      { type: 'p', text: "The progression from a monolith to a distributed system should be driven by constraints: traffic, latency, workload isolation, reliability, team boundaries, or independent scaling requirements." },
      { type: 'p', text: "The most useful approach I have found is to start with the simplest architecture that solves the problem, measure the bottleneck, and introduce a new boundary only when the workload justifies it." }
    ]
  }
];

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-white p-6">
    <div className="text-center">
      <h1 className="text-4xl font-satoshi font-bold text-gray-900 mb-4">Story Not Found</h1>
      <p className="text-gray-600 mb-8 font-inter">The story you are looking for doesn&apos;t exist or has been removed.</p>
      <Link href="/#blogs" className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-300 font-medium">
        Go Back Home
      </Link>
    </div>
  </div>
);

/* ---------- Medium-style interactive bits ---------- */

const MAX_CLAPS = 50;

// Floating "+1" burst shown above the clap button on every click
const ClapBurst = ({ id, onDone }: { id: number; onDone: (id: number) => void }) => (
  <motion.span
    initial={{ opacity: 1, y: 0, scale: 0.8 }}
    animate={{ opacity: 0, y: -34, scale: 1.1 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    onAnimationComplete={() => onDone(id)}
    className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-900 pointer-events-none select-none"
  >
    +1
  </motion.span>
);

const ClapWidget = ({ color }: { color: string }) => {
  const [claps, setClaps] = useState(0);
  const [bursts, setBursts] = useState<number[]>([]);
  const burstId = useRef(0);

  const handleClap = useCallback(() => {
    setClaps((c) => Math.min(MAX_CLAPS, c + 1));
    const id = burstId.current++;
    setBursts((b) => [...b, id]);
  }, []);

  const removeBurst = useCallback((id: number) => {
    setBursts((b) => b.filter((b_) => b_ !== id));
  }, []);

  const isMaxed = claps >= MAX_CLAPS;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative">
        <motion.button
          type="button"
          onClick={handleClap}
          whileTap={{ scale: 0.85 }}
          aria-label="Clap for this story"
          className={`w-11 h-11 rounded-full flex items-center justify-center border transition-colors duration-200 ${claps > 0 ? 'border-transparent text-white' : 'border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-800'
            }`}
          style={claps > 0 ? { backgroundColor: color } : undefined}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5.1a1.5 1.5 0 0 1 3 0V11h.5a1.5 1.5 0 0 1 1.5 1.5v.9l1.4-1a1.6 1.6 0 0 1 2.2 2.2l-3.6 4.9a3 3 0 0 1-2.4 1.2H9.8a3 3 0 0 1-2.6-1.5l-2.3-4a1.4 1.4 0 0 1 2.3-1.6L8 14.5V6a1.5 1.5 0 0 1 3-.4Z" />
          </svg>
        </motion.button>
        <AnimatePresence>
          {bursts.map((id) => (
            <ClapBurst key={id} id={id} onDone={removeBurst} />
          ))}
        </AnimatePresence>
      </div>
      <span className="text-xs text-gray-500 font-medium tabular-nums">
        {claps}{isMaxed ? '+' : ''}
      </span>
    </div>
  );
};



type SelectionPopupState = { visible: boolean; x: number; y: number; text: string; copied: boolean };

const HighlightPopup = ({
  state,
  onCopy,
  onShare,
}: {
  state: SelectionPopupState;
  onCopy: () => void;
  onShare: () => void;
}) => (
  <AnimatePresence>
    {state.visible && (
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        style={{ position: 'fixed', left: state.x, top: state.y, transform: 'translate(-50%, -100%)' }}
        className="z-[120] flex items-center gap-1 bg-gray-900 text-white rounded-lg shadow-lg px-1.5 py-1.5"
      >
        <button
          type="button"
          onClick={onCopy}
          className="px-3 py-1.5 text-xs font-medium rounded-md hover:bg-white/10 transition-colors flex items-center gap-1.5"
        >
          {state.copied ? 'Copied!' : 'Copy quote'}
        </button>
        <span className="w-px h-4 bg-white/20" />
        <button
          type="button"
          onClick={onShare}
          className="px-3 py-1.5 text-xs font-medium rounded-md hover:bg-white/10 transition-colors"
        >
          Share on X
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ---------------------------------------------------- */

const BlogDetails: React.FC = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const articleRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scrollbarOpacity = useTransform(scrollYProgress, [0, 0.9, 0.95], [1, 1, 0]);

  const [selectionPopup, setSelectionPopup] = useState<SelectionPopupState>({
    visible: false,
    x: 0,
    y: 0,
    text: '',
    copied: false,
  });

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      const blogId = parseInt(id as string, 10);

      if (isNaN(blogId)) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      const blog = blogsData.find(b => b.id === blogId);

      if (blog) {
        setBlogData(blog);
        setNotFound(false);
      } else {
        setNotFound(true);
      }

      setIsLoading(false);
    }
  }, [router.isReady, router.query]);

  // Highlight-to-share: watch for text selections inside the article body
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || selection.toString().trim().length === 0) {
        setSelectionPopup((s) => (s.visible ? { ...s, visible: false } : s));
        return;
      }

      const anchorNode = selection.anchorNode;
      if (!articleRef.current || !anchorNode || !articleRef.current.contains(anchorNode)) {
        setSelectionPopup((s) => (s.visible ? { ...s, visible: false } : s));
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;

      setSelectionPopup({
        visible: true,
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
        text: selection.toString().trim(),
        copied: false,
      });
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  const handleCopyQuote = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(selectionPopup.text);
      setSelectionPopup((s) => ({ ...s, copied: true }));
      setTimeout(() => setSelectionPopup((s) => ({ ...s, visible: false })), 900);
    } catch {
      setSelectionPopup((s) => ({ ...s, visible: false }));
    }
  }, [selectionPopup.text]);

  const handleShareTwitter = useCallback(() => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const tweet = `"${selectionPopup.text}"\n\n${url}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, '_blank', 'noopener,noreferrer');
    setSelectionPopup((s) => ({ ...s, visible: false }));
  }, [selectionPopup.text]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-white">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (notFound || !blogData) {
    return <NotFoundPage />;
  }

  return (
    <div className='bg-[rgb(225,232,236)] min-h-screen font-inter'>

      {/* Reading progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[130]"
      >
        <div className="w-full h-full" style={{ backgroundColor: blogData.color }} />
      </motion.div>

      {/* Background Layer - SVG Overlay */}
      <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none">
        {/* Background SVG overlay removed */}
      </div>

      {/* Scroll Progress Bar (dash indicators) */}
      <motion.div style={{ opacity: scrollbarOpacity }} className="fixed right-6 xl:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 z-[100]">
        {Array.from({ length: 8 }).map((_, i) => (
          <Dash key={i} index={i} scrollYProgress={scrollYProgress} totalDashes={8} />
        ))}
      </motion.div>

      {/* Highlight-to-share popup */}
      <HighlightPopup state={selectionPopup} onCopy={handleCopyQuote} onShare={handleShareTwitter} />

      {/* Navbar Integration */}
      <div className="relative z-50">
        <Navbar />
        <TopNavbar />
      </div>

      
      <article className="max-w-[720px] mx-auto px-5 pt-32 pb-24 relative z-10">

        {/* Title */}
        <motion.h1
          variants={cardVariants} initial="hidden" animate="show"
          className="text-[32px] sm:text-[40px] md:text-[46px] leading-[1.15] font-bold font-satoshi text-gray-900 mb-4"
        >
          {blogData.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          variants={cardVariants} initial="hidden" animate="show"
          className="text-lg md:text-[22px] leading-snug text-gray-500 font-inter mb-8"
        >
          {blogData.description}
        </motion.h2>



        {/* Mobile clap bar (shown under lg breakpoint) */}
        <div className="flex lg:hidden justify-start mb-8">
          <ClapWidget color={blogData.color} />
        </div>

        {/* Article Body */}
        <div ref={articleRef} className="font-inter text-[19px] leading-[32px] text-gray-800 selection:bg-yellow-200/70">
          {blogData.content.map((block, index) => {
            if (block.type === 'h2') {
              return (
                <motion.h2 variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} key={index} className="text-2xl sm:text-[26px] font-bold font-satoshi text-gray-900 mt-12 mb-4">
                  {block.text}
                </motion.h2>
              );
            }
            if (block.type === 'quote') {
              return (
                <motion.blockquote variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} key={index} className="border-l-4 border-gray-900 pl-6 py-2 my-10 text-xl sm:text-2xl italic font-satoshi text-gray-800">
                  {block.text}
                </motion.blockquote>
              );
            }
            if (block.type === 'code') {
              return (
                <motion.div
                  variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                  key={index}
                  className="my-8 rounded-xl overflow-hidden border border-gray-200/70"
                >
                  <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1e1e2e] border-b border-white/10">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                    <span className="ml-3 text-xs text-gray-400 font-mono">{block.lang}</span>
                  </div>
                  <pre style={{ fontFamily: "'Courier New', Courier, monospace" }} className="bg-[#1e1e2e] px-6 py-5 overflow-x-auto text-[14px] leading-relaxed text-gray-200 whitespace-pre">{block.text}</pre>
                </motion.div>
              );
            }
            return (
              <motion.p variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} key={index} className="mb-8 tracking-[-0.011em]">
                {block.text}
              </motion.p>
            );
          })}
        </div>

       
      </article>

      <Footer />
    </div>
  );
};

export default BlogDetails;