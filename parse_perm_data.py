import pandas as pd
import sys
import os
import mysql.connector
from mysql.connector import Error


def main(excel_file):
    # 数据库配置 - 请用户根据实际情况修改
    db_config = {
        "host": "localhost",
        "database": "perm_data",
        "user": "root",
        "password": "r9uoftasjzgh5ig",
    }

    try:
        # 读取Excel文件，所有列都作为字符串处理
        df = pd.read_excel(excel_file, dtype=str)

        # 使用哈希表对所有字段进行去重，保留第一条记录
        print("开始执行数据去重操作...")
        unique_rows = {}
        for _, row in df.iterrows():
            # 将整行数据转换为元组作为哈希键，处理NaN值
            row_key = tuple(None if pd.isna(x) else x for x in row)
            if row_key not in unique_rows:
                unique_rows[row_key] = row
        # 转换回DataFrame
        df = pd.DataFrame(unique_rows.values())
        print(f"数据去重完成，共保留 {len(df)} 条唯一记录")

        # 打印第一行数据
        # print("第一行数据:")
        # print(df.iloc[0])

        # 转换日期字段
        date_columns = [col for col in df.columns if col.endswith("_DATE")]
        for col in date_columns:
            df[col] = pd.to_datetime(df[col], errors="coerce").dt.date

        # 连接数据库并插入数据
        connection = mysql.connector.connect(**db_config)
        if connection.is_connected():
            cursor = connection.cursor()

            # 创建插入SQL语句
            columns = ", ".join(df.columns)
            placeholders = ", ".join(["%s"] * len(df.columns))
            insert_query = f"INSERT INTO perm_data ({columns}) VALUES ({placeholders})"

            # 批量插入数据，每1000条执行一次插入
            data = [
                tuple(None if pd.isna(x) else x for x in row)
                for row in df.itertuples(index=False, name=None)
            ]
            batch_size = 1000
            total_rows = len(data)
            inserted_rows = 0
            print("开始插入数据...")
            for i in range(0, total_rows, batch_size):
                # print("第" + str(i + 1) + "行数据:")
                # print(df.iloc[i])
                batch = data[i : i + batch_size]
                cursor.executemany(insert_query, batch)
                connection.commit()
                inserted_rows += len(batch)
                print(f"已插入 {inserted_rows}/{total_rows} 条记录...")

            print(f"成功插入 {inserted_rows} 条记录到数据库")

            cursor.close()
            connection.close()
        else:
            print("错误: 无法连接到数据库。请检查数据库配置并确保数据库已启动。")
            os.exit(1)

    except FileNotFoundError:
        print(f"错误: 文件 '{excel_file}' 未找到。")
        sys.exit(1)
    except Error as e:
        print(f"数据库错误: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"读取文件时发生错误: {e}")
        sys.exit(1)


if __name__ == "__main__":
    excel_file = (
        "C:\\Users\\msx\\Documents\\PERM_Disclosure_Data_FY2023_Q4-原始版本.xlsx"
    )
    main(excel_file)
