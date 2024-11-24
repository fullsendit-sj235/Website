# Algorithm to assess battery storage feasibility
def battery_storage_feasibility(solar_output, consumption, days_of_autonomy):
    # Estimate battery size needed to cover energy consumption during cloudy days or night
    battery_capacity_needed = consumption * days_of_autonomy - solar_output * days_of_autonomy
    return battery_capacity_needed
