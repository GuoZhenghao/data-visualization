# data-visualization
# 项目介绍
数据可视化

一些效果截图:

功能:
- bike 单车
    - tracks 轨迹
        - realtime 实时轨迹(点击轨迹点查看订单和用户详情)
        - quickplay 快速播放一天轨迹
    - point 开关锁点(与时间轴联动)
    - 各种分析图表
- population 人口
    - density 密度
        - 三维柱状图
        - 平面网格
        - 热力
    - OD点
    - 通勤时间网格或15分钟步行圈
- traffic 交通
    - top10 前十拥堵路段(点击查看该处24h变化)
- medicals 医疗
    - 带药趋势(时间轴联动)
    - 一些指标(时间轴联动)
- environment 环境
    - 全国气象站检测的空气质量(点击获取详情)
- ship轮船
    - point 位置分布(时间轴联动)

# 项目结构
前端使用react进行编写，脚手架选择dva。

地图使用mapbox。

后端使用java、go进行服务编写，消息中间件使用kafka，数据库使用mysql、mongodb、mapd。

- data_visualization
    - src