# perm_data_Analytics-and-visualization

#### 介绍

perm_data_Analytics-and-visualization

PERM（Program Electronic Review Management
Process）是美国劳工部对劳工证的电子评估管理体系。这份 Excel 文件中是 2022-2023
年度美国劳工部处理 PERM 申请程序的统计数据。

#### 软件架构

软件架构说明

#### 安装教程

1. xxxx
2. xxxx
3. xxxx

#### 使用说明

1. xxxx
2. xxxx
3. xxxx

perm_data_Analytics-and-visualization 项目主要围绕美国劳工部 PERM（Program
Electronic Review Management
Process）电子评估管理体系的统计数据展开，涉及数据解析、存储和可视化等操作。以下从项目概述、功能模块、技术栈等方面进行介绍：

项目概述 PERM 是美国劳工部对劳工证的电子评估管理体系，项目处理的 Excel 文件包含
2022 - 2023 年度美国劳工部处理 PERM
申请程序的统计数据。项目将数据解析存储到数据库，再从数据库提取数据进行可视化分析。

功能模块 数据解析与存储： parse_perm_data.py：读取 Excel
文件，对数据进行去重、日期字段转换等预处理，然后将处理后的数据批量插入 MySQL
数据库。 数据库操作： create_perm_table.sql：创建 perm_data
表，定义了表结构和各字段的注释。
perm_china_india_processing.sql：创建多个视图，用于分析中国和印度公民的案件状态分布、学历与案件状态关系、专业领域获批情况等。
perm_processing_summary.sql：创建多个视图，统计处理时间、案件状态分布、雇主地区分布等信息。
数据可视化： visualize_perm_data.py：定义 PERMVisualizer
类，连接数据库，从视图中获取数据，生成多种可视化图表，如中国公民案件状态分布、中印公民案件状态对比等。
技术栈 编程语言：Python 数据库：MySQL 数据处理库：pandas、openpyxl
可视化库：matplotlib、seaborn 数据库连接库：mysql-connector-python 项目结构

许可证 项目使用木兰宽松许可证第 2 版（Mulan PSL
v2），允许用户复制、使用、修改及分发软件，但需遵循许可证的相关条款。
