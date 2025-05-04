// This file contains the database schema for future MySQL integration
// It serves as a reference for the database structure

/*
Database Schema for Export-Import AI Platform

Users Table:
- id: INT PRIMARY KEY AUTO_INCREMENT
- name: VARCHAR(255) NOT NULL
- email: VARCHAR(255) NOT NULL UNIQUE
- password_hash: VARCHAR(255) NOT NULL
- company_name: VARCHAR(255)
- role: ENUM('admin', 'manager', 'user') DEFAULT 'user'
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

Shipments Table:
- id: INT PRIMARY KEY AUTO_INCREMENT
- shipment_number: VARCHAR(50) NOT NULL UNIQUE
- user_id: INT NOT NULL (FOREIGN KEY to Users.id)
- type: ENUM('export', 'import') NOT NULL
- status: ENUM('documentation', 'customs_clearance', 'in_transit', 'delivered') NOT NULL
- origin_country: VARCHAR(100) NOT NULL
- destination_country: VARCHAR(100) NOT NULL
- estimated_departure: DATE
- estimated_arrival: DATE
- actual_departure: DATE
- actual_arrival: DATE
- value: DECIMAL(15,2)
- currency: VARCHAR(3) DEFAULT 'USD'
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

Documents Table:
- id: INT PRIMARY KEY AUTO_INCREMENT
- shipment_id: INT NOT NULL (FOREIGN KEY to Shipments.id)
- type: ENUM('invoice', 'packing_list', 'bill_of_lading', 'certificate_of_origin', 'customs_declaration', 'other') NOT NULL
- file_path: VARCHAR(255) NOT NULL
- validation_status: ENUM('pending', 'validated', 'rejected') DEFAULT 'pending'
- validation_notes: TEXT
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

Tracking Table:
- id: INT PRIMARY KEY AUTO_INCREMENT
- shipment_id: INT NOT NULL (FOREIGN KEY to Shipments.id)
- location: VARCHAR(255) NOT NULL
- status: VARCHAR(100) NOT NULL
- timestamp: TIMESTAMP NOT NULL
- notes: TEXT
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

AI_Predictions Table:
- id: INT PRIMARY KEY AUTO_INCREMENT
- shipment_id: INT NOT NULL (FOREIGN KEY to Shipments.id)
- prediction_type: ENUM('delay', 'cost', 'route', 'market') NOT NULL
- prediction_data: JSON NOT NULL
- confidence_score: DECIMAL(5,2)
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

Market_Intelligence Table:
- id: INT PRIMARY KEY AUTO_INCREMENT
- country: VARCHAR(100) NOT NULL
- product_category: VARCHAR(100) NOT NULL
- demand_trend: ENUM('increasing', 'stable', 'decreasing') NOT NULL
- price_trend: ENUM('increasing', 'stable', 'decreasing') NOT NULL
- regulatory_changes: TEXT
- opportunity_score: DECIMAL(5,2)
- data_date: DATE NOT NULL
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

AI_Conversations Table:
- id: INT PRIMARY KEY AUTO_INCREMENT
- user_id: INT NOT NULL (FOREIGN KEY to Users.id)
- conversation_id: VARCHAR(100) NOT NULL
- query: TEXT NOT NULL
- response: TEXT NOT NULL
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
*/
