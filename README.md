# data-visualization
# 项目介绍
数据可视化

一些效果截图:

功能:
- bike 单车
    - tracks 轨迹
        - realtime 实时位置点(kafka websocket接收)
        - quickplay 快速播放一天轨迹(暂时无法实现)
    - point 开关锁点(与时间轴、图表联动)
    - 各种分析图表
        - 爬取微博，展示一天top10关键字
- population 人口
    - density 密度
        - 三维柱状图
        - 平面网格
        - 热力
        - 散点
     - OD点(暂时不引入mapd，不实现)
- traffic 交通
    - top10 前十拥堵路段(点击查看该处24h变化)
    - 实时拥堵指数、拥堵里程等分析图表
- medicals 医疗
    - 带药趋势(时间轴联动)
    - 一些指标(时间轴联动)
- environment 环境
    - 全国气象站检测的空气质量(点击获取详情)
    - 点击联动当日aqi变化曲线
- bts 社区
    - 传感器数据
    - 爬取的热力及社区人口数据
# 项目结构
前端使用react进行编写，脚手架选择dva。

地图使用mapbox。

后端使用java、go进行服务编写，消息中间件使用kafka，数据库使用mysql、mongodb、mapd。

- data_visualization
    - src
