
-- 中国公民案件状态分布视图
CREATE VIEW perm_data.perm_china_status_distribution AS
SELECT 
    CASE_STATUS,
    COUNT(*) AS case_count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS percentage
FROM perm_data
WHERE COUNTRY_OF_CITIZENSHIP = 'CHINA'
GROUP BY CASE_STATUS;

-- 中国公民学历与案件状态视图
CREATE VIEW perm_data.perm_china_education_status AS
SELECT 
    FOREIGN_WORKER_EDUCATION AS education,
    CASE_STATUS,
    COUNT(*) AS case_count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY FOREIGN_WORKER_EDUCATION), 2) AS status_percentage
FROM perm_data
WHERE COUNTRY_OF_CITIZENSHIP = 'CHINA' AND FOREIGN_WORKER_EDUCATION IS NOT NULL
GROUP BY FOREIGN_WORKER_EDUCATION, CASE_STATUS;

-- 中国公民专业领域获批情况视图
CREATE VIEW perm_data.perm_china_major_status AS
SELECT 
    MAJOR_FIELD_OF_STUDY AS major,
    COUNT(CASE WHEN CASE_STATUS IN ('Certified', 'Certified-Expired') THEN 1 END) AS approved_count,
    COUNT(CASE WHEN CASE_STATUS = 'Denied' THEN 1 END) AS denied_count,
    ROUND(
        COUNT(CASE WHEN CASE_STATUS IN ('Certified', 'Certified-Expired') THEN 1 END) * 100.0 / COUNT(*), 2
    ) AS approval_rate
FROM perm_data
WHERE COUNTRY_OF_CITIZENSHIP = 'CHINA' AND MAJOR_FIELD_OF_STUDY IS NOT NULL
GROUP BY MAJOR_FIELD_OF_STUDY
HAVING COUNT(*) > 100
ORDER BY approval_rate DESC;

-- 中国公民职位获批情况视图
CREATE VIEW perm_data.perm_china_job_status AS
SELECT 
    PW_SOC_TITLE AS occupation,
    COUNT(CASE WHEN CASE_STATUS IN ('Certified', 'Certified-Expired') THEN 1 END) AS approved_count,
    COUNT(CASE WHEN CASE_STATUS = 'Denied' THEN 1 END) AS denied_count,
    ROUND(
        COUNT(CASE WHEN CASE_STATUS IN ('Certified', 'Certified-Expired') THEN 1 END) * 100.0 / COUNT(*), 2
    ) AS approval_rate
FROM perm_data
WHERE COUNTRY_OF_CITIZENSHIP = 'CHINA' AND PW_SOC_TITLE IS NOT NULL
GROUP BY PW_SOC_TITLE
HAVING COUNT(*) > 50
ORDER BY approval_rate DESC;

-- 中印公民approved情况对比视图
CREATE VIEW perm_data.perm_china_india_comparison AS
WITH citizenship_stats AS (
    SELECT 
        COUNTRY_OF_CITIZENSHIP AS citizenship,
        CASE_STATUS,
        COUNT(*) AS case_count
    FROM perm_data
    WHERE COUNTRY_OF_CITIZENSHIP IN ('CHINA', 'INDIA')
    GROUP BY COUNTRY_OF_CITIZENSHIP, CASE_STATUS
)
SELECT 
    citizenship,
    SUM(CASE WHEN CASE_STATUS = 'Certified' THEN case_count END) AS certified,
    SUM(CASE WHEN CASE_STATUS = 'Certified-Expired' THEN case_count END) AS certified_expired,
    SUM(CASE WHEN CASE_STATUS = 'Denied' THEN case_count END) AS denied,
    SUM(CASE WHEN CASE_STATUS = 'Withdrawn' THEN case_count END) AS withdrawn,
    SUM(case_count) AS total_cases,
    ROUND(
        SUM(CASE WHEN CASE_STATUS IN ('Certified', 'Certified-Expired') THEN case_count END) * 100.0 / SUM(case_count), 2
    ) AS overall_approval_rate
FROM citizenship_stats
GROUP BY citizenship;