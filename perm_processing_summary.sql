-- 1. 处理时间统计视图
CREATE VIEW
    perm_data.perm_processing_time_stats AS
SELECT
    CASE_STATUS,
    COUNT(*) AS case_count,
    AVG(DATEDIFF (DECISION_DATE, RECEIVED_DATE)) AS avg_processing_days,
    MIN(DATEDIFF (DECISION_DATE, RECEIVED_DATE)) AS min_processing_days,
    MAX(DATEDIFF (DECISION_DATE, RECEIVED_DATE)) AS max_processing_days
FROM
    perm_data
WHERE
    DECISION_DATE IS NOT NULL
GROUP BY
    CASE_STATUS;

-- 2. 案件状态分布视图
CREATE VIEW
    perm_data.perm_status_distribution AS
SELECT
    CASE_STATUS,
    COUNT(*) AS case_count,
    ROUND(
        COUNT(*) * 100.0 / (
            SELECT
                COUNT(*)
            FROM
                perm_data
            WHERE
                DECISION_DATE IS NOT NULL
        ),
        2
    ) AS percentage
FROM
    perm_data
WHERE
    DECISION_DATE IS NOT NULL
GROUP BY
    CASE_STATUS
ORDER BY
    case_count DESC;

-- 3. 雇主地区分布视图
CREATE VIEW
    perm_data.perm_employer_region_dist AS
SELECT
    EMPLOYER_COUNTRY as country,
    EMPLOYER_STATE_PROVINCE AS state,
    EMPLOYER_CITY AS city,
    COUNT(*) AS case_count
FROM
    perm_data
GROUP BY
    EMPLOYER_STATE_PROVINCE,
    EMPLOYER_CITY,
    EMPLOYER_COUNTRY
ORDER BY
    case_count DESC;

-- 4. 承办律所统计视图
CREATE VIEW
    perm_data.perm_law_firm_stats AS
SELECT
    AGENT_ATTORNEY_FIRM_NAME AS law_firm,
    COUNT(*) AS case_count,
    ROUND(AVG(DATEDIFF (DECISION_DATE, RECEIVED_DATE)), 2) AS avg_processing_days
FROM
    perm_data
WHERE
    AGENT_ATTORNEY_FIRM_NAME IS NOT NULL
    AND DECISION_DATE IS NOT NULL
GROUP BY
    AGENT_ATTORNEY_FIRM_NAME
ORDER BY
    case_count DESC;

-- 5. 职位与薪资统计视图
CREATE VIEW
    perm_data.perm_occupation_wage_stats AS
SELECT
    PW_SOC_TITLE AS occupation,
    JOB_TITLE,
    COUNT(*) AS case_count,
    AVG(CAST(PW_WAGE AS DECIMAL)) AS avg_prevailing_wage,
    AVG(CAST(WAGE_OFFER_FROM AS DECIMAL)) AS avg_wage_offer
FROM
    perm_data
WHERE
    PW_SOC_TITLE IS NOT NULL
GROUP BY
    PW_SOC_TITLE,
    JOB_TITLE
ORDER BY
    avg_prevailing_wage DESC;

-- 6. 劳工背景统计视图
CREATE VIEW
    perm_data.perm_worker_background_stats AS
SELECT
    COUNTRY_OF_CITIZENSHIP AS citizenship,
    MINIMUM_EDUCATION AS required_education,
    FOREIGN_WORKER_EDUCATION AS worker_education,
    COUNT(*) AS case_count
FROM
    perm_data
GROUP BY
    COUNTRY_OF_CITIZENSHIP,
    MINIMUM_EDUCATION,
    FOREIGN_WORKER_EDUCATION
ORDER BY
    case_count DESC;