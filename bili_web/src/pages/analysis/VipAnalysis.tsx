import React, {Component} from 'react';
import {Column} from '@ant-design/charts';
import {connect} from 'umi';

class VipAnalysis extends Component {

  //初始化render之后只执行一次
  componentDidMount() {
    // 声明一个自定义事件
    // 在组件装载完成以后
    const {dispatch} = this.props;
    // //调用Model
    dispatch({
      type: 'VipModel/getInfo',
      payload: {},
    });
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | Iterable<React.ReactNode> | React.ReactPortal | boolean | null | undefined {
    const data_tmp = this.props.info;
    console.log(data_tmp)
    const data = []
    for (let i in data_tmp){
      if (data_tmp[i].is_vip == 'N' && data_tmp[i].is_year_vip == 'N'){
        data.push({"type":"非会员","value":data_tmp[i].count_n})
      }
      if (data_tmp[i].is_vip == 'Y' && data_tmp[i].is_year_vip == 'N'){
        data.push({"type":"普通会员","value":data_tmp[i].count_n})
      }
      if (data_tmp[i].is_vip == 'Y' && data_tmp[i].is_year_vip == 'Y'){
        data.push({"type":"年度会员","value":data_tmp[i].count_n})
      }
    }
    console.log(data)
    const config = {
      data,
      xField: 'type',
      yField: 'value',
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
        type: {
          alias: '关注人数级别',
        },
        value: {
          alias: '人数',
        },
      },
    };
    return <Column {...config} />;
  }
}


//设置绑定的返回数据
const mapStateToProps = (state) => {
  return {
    info: state.VipModel.info,
  }
}
//连接
export default connect(mapStateToProps)(VipAnalysis);
