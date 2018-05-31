# data-visualization
# 项目介绍
时空大数据可视化

功能：
- bts 社区
    - 传感器数据
    - 爬取的热力及社区人口数据
- environment 环境
    - 全国气象站检测的空气质量(点击获取详情)
    - 点击联动当日aqi变化曲线
- traffic 交通
    - top10 前十拥堵路段(点击查看该处24h变化)
    - 实时拥堵指数、拥堵里程等分析图表
- bike 单车
    - realtime
        - 实时位置
    - history
        - 开关锁点
        - quickplay 快速播放一天轨迹(暂时无法实现)
- medicals 医疗
    - 带药趋势(时间轴联动)
    - 一些指标(时间轴联动)
- population 人口
    - density 密度
        - 三维柱状图(完成)
        - 平面网格
        - 热力
        - 散点
    - OD飞线(暂时不引入mapd，不实现)

部分截图：
- 首页
![首页](/res/home.png)
- 社区-环境传感器
![社区环境传感器](/res/bts_env.png)
- 社区-人口
![社区人口](/res/bts_pop.png)
- 全国环境
![全国环境](/res/env.png)
- 北京交通
![北京交通](/res/traffic.png)
- 单车-实时
![单车实时位置点](/res/bike_real.png)
![某车位置1](/res/bike_real_1.png)
![某车位置2](/res/bike_real_2.png)
- 单车-昨日开关锁点
![单车昨日开关锁](/res/bike_his.png)
- 医疗
![医疗](/res/medical.png)
- 北京人口
![北京人口](/res/pop.png)
# 项目结构
前端使用react进行编写，脚手架选择dva。

地图使用mapbox。

后端使用java、go进行服务编写，消息中间件使用kafka，数据库使用mysql、mongodb、mapd。

- data_visualization
    - src
