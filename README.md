# EDA Sales Assignment

## Project Overview

This project performs Exploratory Data Analysis (EDA) on a sales records dataset. The dataset contains 500,000 sales transactions with information such as region, country, item type, sales channel, order priority, order dates, units sold, revenue, cost and profit.

The aim of this project is to prepare, clean, analyse and interpret the dataset using Python.

## Tools and Libraries Used

- Python
- Pandas
- Matplotlib
- Seaborn
- OpenPyXL
- Jupyter Notebook

## Project Structure

EDA-SALES-ASSIGNMENT/
├── data/
│   └── Sales Records.csv.xlsx
├── notebooks/
│   └── sales_eda.ipynb
├── README.md
├── requirements.txt
└── .gitignore



---

# EDA Project 2: Mental Health Depression Disorder Dataset

## Project Overview

This project performs Exploratory Data Analysis (EDA) on a mental health depression disorder dataset. The dataset contains country-year records related to different mental health disorder percentages, including depression, anxiety disorders, bipolar disorder, eating disorders, drug use disorders, alcohol use disorders, and schizophrenia.

The aim of this project is to prepare, clean, analyse, and interpret mental health disorder patterns across countries and years.

## Dataset Details

The original dataset contained 108,553 rows and 11 columns. After cleaning, the dataset was reduced to 6,468 rows and 11 columns. The cleaned dataset was used for analysis because it contained valid `Year` and `Depression (%)` values.

## Main Steps Completed

1. Loaded the mental health dataset into a Pandas DataFrame.
2. Checked the number of rows, columns, column names, and data types.
3. Converted numerical columns that were originally read as text into proper numeric format.
4. Checked and handled missing values.
5. Checked duplicate records.
6. Detected outliers using the IQR method.
7. Created visualisations including histogram, bar chart, correlation heatmap, scatter plot, and pair plot.
8. Summarised key findings and possible machine learning questions.

## Key Findings

- Some numerical columns were initially read as text and had to be converted into numeric format.
- After cleaning, the dataset contained 6,468 rows and 11 columns.
- No duplicate records were found.
- Outliers were found in `Depression (%)` and `Anxiety disorders (%)`, but they were retained because they may represent real country-year differences.
- The strongest correlation was between `Bipolar disorder (%)` and `Eating disorders (%)`, with a correlation value of 0.708.
- The scatter plot and pair plot supported this positive relationship.

## Final Verdict

The cleaned mental health dataset is suitable for Exploratory Data Analysis. Before using it for machine learning, further steps such as handling remaining missing values, feature scaling, validating outlier treatment, and checking country-level imbalance would be recommended.