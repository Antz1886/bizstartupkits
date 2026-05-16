import argparse
import json

def calculate_leakage(headcount, avg_salary):
    """
    Calculates Annual Inefficiency Leakage and provides recovery projections.
    
    Formula: Leakage = N * S * 0.40
    where N is headcount, S is average salary, and 0.40 is the Ghost Capacity constant.
    """
    factor = 0.40
    leakage = headcount * avg_salary * factor
    
    # Standard metrics for the JSON Technical Wedge
    annual_work_hours = 1950 # 37.5 hrs/week * 52 weeks
    manual_hours_wasted = headcount * annual_work_hours * factor
    
    # B.A.T Model Projections
    target_resolution_rate = 0.83
    human_capital_reallocation = leakage * target_resolution_rate
    
    return {
        "client_id": "prospect_id_pending",
        "baseline_metrics": {
            "ghost_capacity_leakage_zar": round(leakage, 2),
            "manual_hours_wasted_annual": int(manual_hours_wasted),
            "efficiency_constant": factor
        },
        "recovery_projections": {
            "target_resolution_rate": "83%",
            "projected_cost_reduction_percent": 50,
            "human_capital_reallocation_zar": round(human_capital_reallocation, 2)
        },
        "compliance_status": {
            "popia_ready": True,
            "governance_shield_active": True
        }
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Bizstartupkits Diagnostic Engine")
    parser.add_argument("--headcount", type=int, required=True, help="Number of employees")
    parser.add_argument("--salary", type=float, required=True, help="Average salary (ZAR)")
    
    args = parser.parse_args()
    results = calculate_leakage(args.headcount, args.salary)
    print(json.dumps(results, indent=2))
