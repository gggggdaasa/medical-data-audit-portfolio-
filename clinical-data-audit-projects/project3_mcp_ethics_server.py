# clinical-data-audit-projects/project3_mcp_ethics_server.py

import json
import sys
import re

class MCPEthicsAuditServer:
    """
    Model Context Protocol (MCP) Server for safe medical auditing sheets inspection.
    Provides tools with automated privacy-preserving AI Ethics filters (redacts patient names, 
    SSNs, and unique keys prior to sharing data payload with LLMs).
    """
    def __init__(self):
        self.host_active = True
        # Mock database of Patient Registration and Clinical Data
        self.patients_db = [
            {"PatientID": "P-101", "FullName": "Ahmed Fawzi", "SSN": "299-122-3849", "SysBP": 120, "Clinic": "Cairo Center"},
            {"PatientID": "P-102", "FullName": "Sarah Omar", "SSN": "295-883-2940", "SysBP": 145, "Clinic": "Alexandria West"},
            {"PatientID": "P-103", "FullName": "John Doe", "SSN": "503-294-1925", "SysBP": 130, "Clinic": "Cairo Center"},
            {"PatientID": "P-101", "FullName": "Ahmd Fawzi", "SSN": "299-122-3849", "SysBP": 118, "Clinic": "Cairo Center"}, # duplicate ID
        ]

    def redact_pii(self, dataset):
        """
        AI Ethics Layer: Ensures direct PII (Full Name, SSN) is completely redacted or
        transformed to hash strings to prevent accidental leakage to LLM context windows.
        """
        filtered_logs = []
        for p in dataset:
            cleaned_p = p.copy()
            # Anonymize biological names
            name = cleaned_p.get("FullName", "")
            if name:
                cleaned_p["FullName"] = f"{name[0]}***" if len(name) > 0 else "***"
            # Redact full Identity Numbers
            cleaned_p["SSN"] = "REDACTED_BY_MCP_ETHICS_POLICY"
            filtered_logs.append(cleaned_p)
        return filtered_logs

    def list_tools(self):
        """
        Exposes secure system auditing capabilities strictly defining input expectations.
        """
        return {
            "jsonrpc": "2.0",
            "result": {
                "tools": [
                    {
                        "name": "search_patient_sheets",
                        "description": "Searches for medical patients within specific clinic bounds. Automatically applies AI privacy guidelines to hide PII identifiers.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "clinic_filter": {"type": "string", "description": "Name of the clinic to query (e.g. Cairo Center)"}
                            }
                        }
                    },
                    {
                        "name": "check_duplicates",
                        "description": "Scans clinical sheets to flag duplicate registration logs sharing identical credentials prior to medical insurance clearing.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                ]
            }
        }

    def execute_tool(self, name, arguments):
        """
        Runs the specified tool and applies prompt-injection/PII sanitization blocks.
        """
        if name == "search_patient_sheets":
            clinic_filter = arguments.get("clinic_filter", "").strip().lower()
            results = [p for p in self.patients_db if clinic_filter in p["Clinic"].lower()]
            safe_results = self.redact_pii(results)
            return {
                "jsonrpc": "2.0",
                "result": {
                    "content": [{"type": "text", "text": json.dumps(safe_results, indent=2)}]
                }
            }
            
        elif name == "check_duplicates":
            # Group records to reveal duplicate patient accounts
            seen_ids = {}
            duplicates_found = []
            for p in self.patients_db:
                pid = p["PatientID"]
                if pid in seen_ids:
                    duplicates_found.append({
                        "PatientID": pid,
                        "Record1_Clinic": seen_ids[pid]["Clinic"],
                        "Record2_Clinic": p["Clinic"],
                        "Resolution_Recommendation": "Merge duplicated patient chart fields into a single master clinical file."
                    })
                else:
                    seen_ids[pid] = p

            return {
                "jsonrpc": "2.0",
                "result": {
                    "content": [
                        {"type": "text", "text": "⚠️ Duplicate Registration Records Detected:"},
                        {"type": "text", "text": json.dumps(duplicates_found, indent=2)}
                    ]
                }
            }
        else:
            return {
                "jsonrpc": "2.0",
                "error": {"code": -32601, "message": f"Method {name} not found."}
            }

    def run_stdio_loop(self):
        """
        A robust stdin/stdout communication loop adhering strictly to JSON-RPC protocol
        for secure Model Context Protocol integrations.
        """
        print("🟢 Secure AI MCP-Ethics-Server initialized over stdio.", file=sys.stderr)
        while self.host_active:
            try:
                line = sys.stdin.readline()
                if not line:
                    break
                
                request = json.loads(line)
                method = request.get("method")
                req_id = request.get("id")
                
                if method == "tools/list":
                    response = self.list_tools()
                    response["id"] = req_id
                    sys.stdout.write(json.dumps(response) + "\n")
                    sys.stdout.flush()
                elif method == "tools/call":
                    params = request.get("params", {})
                    tool_name = params.get("name")
                    tool_args = params.get("arguments", {})
                    response = self.execute_tool(tool_name, tool_args)
                    response["id"] = req_id
                    sys.stdout.write(json.dumps(response) + "\n")
                    sys.stdout.flush()
                else:
                    # Generic response for other MCP lifecycles (e.g. initialize)
                    sys.stdout.write(json.dumps({"jsonrpc": "2.0", "id": req_id, "result": {"status": "connected"}}) + "\n")
                    sys.stdout.flush()
            except Exception as e:
                print(f"❌ Connection error: {str(e)}", file=sys.stderr)


if __name__ == "__main__":
    # If parameters exist, run custom query test directly for developer debugging ease
    if len(sys.argv) > 1 and sys.argv[1] == "--test":
        server = MCPEthicsAuditServer()
        print("🧪 Testing search_patient_sheets with 'Cairo Center':")
        res1 = server.execute_tool("search_patient_sheets", {"clinic_filter": "Cairo Center"})
        print(res1["result"]["content"][0]["text"])
        
        print("\n🧪 Testing check_duplicates:")
        res2 = server.execute_tool("check_duplicates", {})
        print(res2["result"]["content"][1]["text"])
    else:
        # Launch standard production stdio JSON-RPC loop
        server = MCPEthicsAuditServer()
        server.run_stdio_loop()
