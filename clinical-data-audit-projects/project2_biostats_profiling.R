# clinical-data-audit-projects/project2_biostats_profiling.R

library(dplyr)
library(ggplot2)

#' Biostatistics Module: Patient Clinical Profiling & Imputation Pipeline
#' Performs validation, logs and filters outliers, and imputes missing physiological parameters.

run_biostats_audit <- function(input_path = "raw_clinic_patients.csv", output_report = "clinical_biostats_profiling.pdf") {
  message("🚀 Initializing Biostatistics Clinical Records Audit...")
  
  # 1. Generate realistic synthetic health data if not existing
  if (!file.exists(input_path)) {
    message("⚠️ Input missing. Synthesizing medical audit records...")
    set.seed(42)
    n <- 500
    mock_data <- data.frame(
      PatientID = paste0("PT-", 1000 + 1:n),
      ClinicCode = sample(c("Clinic_North", "Clinic_East", "Clinic_South"), n, replace = TRUE),
      Age = sample(c(18:85, NA), n, replace = TRUE, prob = c(rep(1, 68), 5)), # has random NAs
      HeartRate = sample(c(45:130, NA), n, replace = TRUE, prob = c(rep(1, 86), 8)),
      Cholesterol = round(rnorm(n, mean = 200, sd = 40), 1)
    )
    # Add a few severe physiological outliers (Heart rates that are medically impossible)
    mock_data$HeartRate[sample(1:n, 5)] <- 450
    mock_data$Cholesterol[sample(1:n, 4)] <- 800
    
    write.csv(mock_data, input_path, row.names = FALSE)
    message("✅ Synthetic cohort data written to: ", input_path)
  }
  
  # 2. Import Data
  df <- read.csv(input_path)
  
  # 3. Apply extreme outlier filters using dplyr vectorized workflows
  # We flag heart rate > 220 as anomalies and cholesterol values outside plausible clinical bounds
  cleaned_df <- df %>%
    mutate(
      Outlier_Flag = ifelse(HeartRate > 220 | Cholesterol > 500, "Severe Outlier", "Plausible"),
      # Replace severe outlier values with NA to prepare them for clinical statistical imputation
      HeartRate_Cleaned = ifelse(Outlier_Flag == "Severe Outlier", NA_integer_, HeartRate),
      Cholesterol_Cleaned = ifelse(Outlier_Flag == "Severe Outlier", NA_real_, Cholesterol)
    )
  
  # 4. Stratified Imputation (Compute group-specific median metrics conditional on Clinic Location)
  # In statistical clinical analysis, median provides robust estimates resilient to skewness.
  message("📊 Executing conditional group-specific median imputations...")
  imputed_df <- cleaned_df %>%
    group_by(ClinicCode) %>%
    mutate(
      # Standardize Age with overall median, HeartRate with location group-specific median
      Age_Imputed = ifelse(is.na(Age), rlang::as_integer(median(Age, na.rm = TRUE)), Age),
      HR_Imputed = ifelse(is.na(HeartRate_Cleaned), rlang::as_integer(median(HeartRate_Cleaned, na.rm = TRUE)), HeartRate_Cleaned),
      Chol_Imputed = ifelse(is.na(Cholesterol_Cleaned), round(median(Cholesterol_Cleaned, na.rm = TRUE), 1), Cholesterol_Cleaned)
    ) %>%
    ungroup()
  
  # 5. Diagnostic Visualization Setup
  message("📈 Generating clinical metrics audit plots as ggplot2 PDF...")
  pdf(file = output_report, width = 8, height = 5)
  
  # Outlier identification scatter plotting
  p1 <- ggplot(cleaned_df, aes(x = HeartRate, y = Cholesterol, color = Outlier_Flag)) +
    geom_point(alpha = 0.7, size = 2.5) +
    scale_color_manual(values = c("Severe Outlier" = "#ef4444", "Plausible" = "#06b6d4")) +
    theme_minimal() +
    labs(
      title = "Clinical Records Anomaly Verification (Outlier Biplot)",
      subtitle = "Visual diagnostics for heart rate and total cholesterol distributions",
      x = "Raw Heart Rate (bpm)",
      y = "Total Cholesterol (mg/dL)",
      color = "Physiological Status"
    ) +
    theme(
      plot.title = element_text(face = "bold", size = 12),
      legend.position = "bottom"
    )
  print(p1)
  
  # Distributive profiles before vs after strategic imputation
  p2 <- ggplot() +
    geom_density(data = df, aes(x = HeartRate, fill = "Before Imputation"), alpha = 0.35) +
    geom_density(data = imputed_df, aes(x = HR_Imputed, fill = "After Clinic Imputation"), alpha = 0.45) +
    scale_fill_manual(values = c("Before Imputation" = "#94a3b8", "After Clinic Imputation" = "#22d3ee")) +
    theme_minimal() +
    labs(
      title = "Heart Rate Density Distribution Audit Profile",
      subtitle = "Compares clinical range density before vs after stratified group imputation",
      x = "Heart Rate (bpm)",
      ylabel = "Density",
      fill = "Cohort States"
    ) +
    theme(
      plot.title = element_text(face = "bold", size = 12),
      legend.position = "bottom"
    )
  print(p2)
  
  dev.off()
  
  message("🎉 Clinical Audit Accomplished successfully!")
  message("📂 Detailed metrics output saved to: imputed_cohort_registry.csv")
  message("📊 Scientific report PDF compiled to: ", output_report)
  
  # Save the finalized registry
  write.csv(imputed_df, "imputed_cohort_registry.csv", row.names = FALSE)
}

# Run pipeline
if (!interactive()) {
  run_biostats_audit()
}
