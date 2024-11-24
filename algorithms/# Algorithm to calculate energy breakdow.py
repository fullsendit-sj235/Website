# Algorithm to calculate energy breakdown and time-of-day renewable energy contribution
def city_energy_analysis(energy_data, time_of_day):
    total_consumption = sum(energy_data.values())  # Sum of all energy sources
    energy_mix_percentage = {source: (amount / total_consumption) * 100 
                             for source, amount in energy_data.items()}
    
    # Calculate renewable energy contribution at different times of day (e.g., solar contribution)
    renewable_contribution = {
        "solar": energy_data["solar"] * time_of_day["solar_hours"] / 24,
        "wind": energy_data["wind"] * time_of_day["wind_hours"] / 24
    }
    
    return energy_mix_percentage, renewable_contribution
