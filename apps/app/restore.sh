#!/bin/bash

pg_restore -U postgres -d template1 -h localhost -p 5432 -v "./backups/2024-02-26-invoicelink.bak"
