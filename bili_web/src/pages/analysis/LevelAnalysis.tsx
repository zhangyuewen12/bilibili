import React from 'react';
import {Column} from '@ant-design/charts';
import {connect} from 'umi';


class LevelAnalysis extends React.Component {
  //初始化render之后只执行一次

  componentDidMount() {
    // 声明一个自定义事件
    // 在组件装载完成以后
    const {dispatch} = this.props;
    // //调用Model
    dispatch({
      type: 'LevelModel/getInfo',
      payload: {},
    });
  }

  render() {
    const data = this.props.info;
    console.log(data)
    const config = {
      data,
      xField: 'levelKind',
      yField: 'count_n',
      label: {
        // 可手动配置 label 数据标签位置
        // position: 'middle',
        // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        levelKind: {
          alias: '用户等级',
        },
        count_n: {
          alias: '人数',
        },
      },
      // legend: true,
    };
    return <Column {...config} />;
  }
}

//设置绑定的返回数据
const mapStateToProps = (state) => {
  return {
    info: state.LevelModel.info,
  }
}
//连接
export default connect(mapStateToProps)(LevelAnalysis);
