import mysql.connector
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os
from mysql.connector import Error

# 设置中文显示
plt.rcParams["font.family"] = ["SimHei", "Microsoft YaHei", "SimSun"]
plt.rcParams['axes.unicode_minus'] = False  # 解决负号显示问题

def create_visualization_dir():
    """创建可视化结果保存目录"""
    dir_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'visualizations')
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)
    return dir_path

class PERMVisualizer:
    def __init__(self, db_config):
        self.db_config = db_config
        self.connection = None
        self.visualization_dir = create_visualization_dir()

    def connect(self):
        """连接到MySQL数据库"""
        try:
            self.connection = mysql.connector.connect(**self.db_config)
            if self.connection.is_connected():
                print("成功连接到MySQL数据库")
                return True
        except Error as e:
            print(f"数据库连接错误: {e}")
            return False

    def close(self):
        """关闭数据库连接"""
        if self.connection and self.connection.is_connected():
            self.connection.close()
            print("数据库连接已关闭")

    def fetch_data(self, query):
        """执行查询并返回DataFrame"""
        if not self.connection or not self.connection.is_connected():
            print("数据库未连接，请先调用connect()方法")
            return None

        try:
            df = pd.read_sql(query, self.connection)
            return df
        except Error as e:
            print(f"查询执行错误: {e}")
            return None

    def visualize_china_status_distribution(self):
        """可视化中国公民案件状态分布"""
        query = "SELECT * FROM perm_data.perm_china_status_distribution"
        df = self.fetch_data(query)
        if df is None or df.empty:
            print("没有获取到中国公民案件状态分布数据")
            return

        plt.figure(figsize=(10, 6))
        colors = ['#4CAF50', '#FFC107', '#F44336', '#2196F3']
        wedges, texts, autotexts = plt.pie(
            df['percentage'],
            labels=df['CASE_STATUS'],
            autopct='%1.1f%%',
            startangle=90,
            colors=colors,
            textprops={'fontsize': 12}
        )
        plt.title('中国公民PERM案件状态分布', fontsize=16)
        plt.axis('equal')  # 确保饼图是正圆形
        plt.tight_layout()

        # 添加图例
        plt.legend(wedges, df['CASE_STATUS'], title="案件状态", loc="center left", bbox_to_anchor=(1, 0, 0.5, 1))

        # 保存图表
        file_path = os.path.join(self.visualization_dir, 'china_status_distribution.png')
        plt.savefig(file_path, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"中国公民案件状态分布图已保存至: {file_path}")

    def visualize_china_education_status(self):
        """可视化中国公民学历与案件状态关系"""
        query = "SELECT * FROM perm_data.perm_china_education_status"
        df = self.fetch_data(query)
        if df is None or df.empty:
            print("没有获取到中国公民学历与案件状态数据")
            return

        # 转换为透视表以便绘图
        pivot_df = df.pivot(index='education', columns='CASE_STATUS', values='case_count').fillna(0)

        plt.figure(figsize=(12, 7))
        pivot_df.plot(kind='bar', stacked=True, colormap='viridis')
        plt.title('中国公民学历与案件状态关系', fontsize=16)
        plt.xlabel('学历', fontsize=14)
        plt.ylabel('案件数量', fontsize=14)
        plt.xticks(rotation=45)
        plt.legend(title='案件状态')
        plt.tight_layout()

        # 保存图表
        file_path = os.path.join(self.visualization_dir, 'china_education_status.png')
        plt.savefig(file_path, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"中国公民学历与案件状态关系图已保存至: {file_path}")

    def visualize_china_major_status(self):
        """可视化中国公民专业领域获批情况"""
        query = "SELECT * FROM perm_data.perm_china_major_status LIMIT 10"
        df = self.fetch_data(query)
        if df is None or df.empty:
            print("没有获取到中国公民专业领域获批情况数据")
            return

        plt.figure(figsize=(14, 8))
        ax = sns.barplot(x='approval_rate', y='major', data=df, palette='coolwarm')
        plt.title('中国公民专业领域获批率排名(前10)', fontsize=16)
        plt.xlabel('获批率 (%)', fontsize=14)
        plt.ylabel('专业领域', fontsize=14)
        plt.xlim(0, 100)  # 设置x轴范围为0-100

        # 在条形上显示具体数值
        for i, v in enumerate(df['approval_rate']):
            ax.text(v + 0.5, i, f'{v}%', va='center')

        plt.tight_layout()

        # 保存图表
        file_path = os.path.join(self.visualization_dir, 'china_major_status.png')
        plt.savefig(file_path, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"中国公民专业领域获批情况图已保存至: {file_path}")

    def visualize_china_job_status(self):
        """可视化中国公民职位approved情况"""
        query = "SELECT * FROM perm_data.perm_china_job_status LIMIT 10"
        df = self.fetch_data(query)
        if df is None or df.empty:
            print("没有获取到中国公民职位approved情况数据")
            return

        plt.figure(figsize=(14, 8))
        ax = sns.barplot(x='approval_rate', y='occupation', data=df, palette='magma')
        plt.title('中国公民职位approved率排名(前10)', fontsize=16)
        plt.xlabel('approved率 (%)', fontsize=14)
        plt.ylabel('职位', fontsize=14)
        plt.xlim(0, 100)  # 设置x轴范围为0-100

        # 在条形上显示具体数值
        for i, v in enumerate(df['approval_rate']):
            ax.text(v + 0.5, i, f'{v}%', va='center')

        plt.tight_layout()

        # 保存图表
        file_path = os.path.join(self.visualization_dir, 'china_job_status.png')
        plt.savefig(file_path, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"中国公民职位approved情况图已保存至: {file_path}")

    def visualize_china_india_comparison(self):
        """可视化中印公民approved情况对比"""
        query = "SELECT * FROM perm_data.perm_china_india_comparison"
        df = self.fetch_data(query)
        if df is None or df.empty:
            print("没有获取到中印公民approved情况对比数据")
            return

        # 提取中国和印度数据
        china_data = df[df['citizenship'] == 'CHINA'].iloc[0]
        india_data = df[df['citizenship'] == 'INDIA'].iloc[0]

        # 准备对比数据
        status_labels = ['Certified', 'Certified-Expired', 'Denied', 'Withdrawn']
        china_values = [china_data['certified'], china_data['certified_expired'], china_data['denied'], china_data['withdrawn']]
        india_values = [india_data['certified'], india_data['certified_expired'], india_data['denied'], india_data['withdrawn']]

        plt.figure(figsize=(12, 8))
        bar_width = 0.35
        index = range(len(status_labels))

        # 绘制条形图
        china_bars = plt.bar([i - bar_width/2 for i in index], china_values, bar_width, label='中国公民', color='#2196F3')
        india_bars = plt.bar([i + bar_width/2 for i in index], india_values, bar_width, label='印度公民', color='#FF9800')

        plt.title('中印公民PERM案件状态对比', fontsize=16)
        plt.xlabel('案件状态', fontsize=14)
        plt.ylabel('案件数量', fontsize=14)
        plt.xticks(index, status_labels)
        plt.legend()

        # 添加数值标签
        def add_labels(bars):
            for bar in bars:
                height = bar.get_height()
                plt.text(bar.get_x() + bar.get_width()/2., height, f'{int(height)}', ha='center', va='bottom')

        add_labels(china_bars)
        add_labels(india_bars)

        plt.tight_layout()

        # 保存图表
        file_path = os.path.join(self.visualization_dir, 'china_india_comparison.png')
        plt.savefig(file_path, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"中印公民approved情况对比图已保存至: {file_path}")

    def visualize_processing_time_stats(self):
        """可视化不同案件状态的处理时间"""
        query = "SELECT * FROM perm_data.perm_processing_time_stats"
        df = self.fetch_data(query)
        if df is None or df.empty:
            print("没有获取到案件处理时间数据")
            return

        plt.figure(figsize=(12, 7))
        ax = df.plot(x='CASE_STATUS', y=['avg_processing_days', 'min_processing_days', 'max_processing_days'], kind='bar', colormap='Set2')
        plt.title('不同案件状态的处理时间统计', fontsize=16)
        plt.xlabel('案件状态', fontsize=14)
        plt.ylabel('天数', fontsize=14)
        plt.xticks(rotation=0)
        plt.legend(['平均处理天数', '最短处理天数', '最长处理天数'])

        # 添加数值标签
        for p in ax.patches:
            ax.annotate(str(round(p.get_height(), 1)), (p.get_x() * 1.005, p.get_height() * 1.005))

        plt.tight_layout()

        # 保存图表
        file_path = os.path.join(self.visualization_dir, 'processing_time_stats.png')
        plt.savefig(file_path, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"案件处理时间统计图已保存至: {file_path}")

    def visualize_employer_region_dist(self):
        """可视化雇主地区分布"""
        query = "SELECT * FROM perm_data.perm_employer_region_dist LIMIT 10"
        df = self.fetch_data(query)
        if df is None or df.empty:
            print("没有获取到雇主地区分布数据")
            return

        # 格式化地区名称
        df['region'] = df['city'] + ', ' + df['state']

        plt.figure(figsize=(12, 8))
        ax = sns.barplot(x='case_count', y='region', data=df, palette='rocket')
        plt.title('雇主地区分布(前10)', fontsize=16)
        plt.xlabel('案件数量', fontsize=14)
        plt.ylabel('地区', fontsize=14)

        # 添加数值标签
        for i, v in enumerate(df['case_count']):
            ax.text(v + 5, i, f'{v}', va='center')

        plt.tight_layout()

        # 保存图表
        file_path = os.path.join(self.visualization_dir, 'employer_region_dist.png')
        plt.savefig(file_path, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"雇主地区分布图已保存至: {file_path}")

    def visualize_occupation_wage_stats(self):
        """可视化职位与薪资关系"""
        query = "SELECT * FROM perm_data.perm_occupation_wage_stats LIMIT 10"
        df = self.fetch_data(query)
        if df is None or df.empty:
            print("没有获取到职位与薪资数据")
            return

        plt.figure(figsize=(14, 8))
        x = range(len(df))
        width = 0.35

        plt.bar([i - width/2 for i in x], df['avg_prevailing_wage'], width, label='平均现行工资', color='#4CAF50')
        plt.bar([i + width/2 for i in x], df['avg_wage_offer'], width, label='平均提议工资', color='#FF9800')

        plt.title('职位与薪资关系(前10)', fontsize=16)
        plt.xlabel('职位', fontsize=14)
        plt.ylabel('薪资', fontsize=14)
        plt.xticks(x, df['occupation'], rotation=45, ha='right')
        plt.legend()

        plt.tight_layout()

        # 保存图表
        file_path = os.path.join(self.visualization_dir, 'occupation_wage_stats.png')
        plt.savefig(file_path, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"职位与薪资关系图已保存至: {file_path}")

    def generate_all_visualizations(self):
        """生成所有可视化图表"""
        print("开始生成所有可视化图表...")
        self.visualize_china_status_distribution()
        self.visualize_china_education_status()
        self.visualize_china_major_status()
        self.visualize_china_job_status()
        self.visualize_china_india_comparison()
        self.visualize_processing_time_stats()
        self.visualize_employer_region_dist()
        self.visualize_occupation_wage_stats()
        print("所有可视化图表生成完成!")

if __name__ == "__main__":
    # 从parse_perm_data.py中复用数据库配置
    db_config = {
        "host": "localhost",
        "database": "perm_data",
        "user": "root",
        "password": "***************",
    }

    visualizer = PERMVisualizer(db_config)
    if visualizer.connect():
        visualizer.generate_all_visualizations()
        visualizer.close()
    else:
        print("数据库连接失败，无法生成可视化图表")
        os.exit(1)