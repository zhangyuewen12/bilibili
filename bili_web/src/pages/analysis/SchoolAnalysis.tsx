import React from 'react';
import {Column,Bar} from '@ant-design/charts';
import {connect} from 'umi';


class SchoolAnalysis extends React.Component {
  //初始化render之后只执行一次

  componentDidMount() {
    // 声明一个自定义事件
    // 在组件装载完成以后
    const {dispatch} = this.props;
    // //调用Model
    dispatch({
      type: 'SchoolModel/getInfo',
      payload: {},
    });
  }

  render() {
    const data = this.props.info;
    console.log(data)


    const config = {
      data,
      yField: 'schoolName',
      xField: 'count_n',
      yAxis: {
        label: {
          autoRotate: false,
        },
      },
      scrollbar: {
        type: 'vertical',
      },
    };
    return <Bar {...config} />;
  }
}

//设置绑定的返回数据
const mapStateToProps = (state) => {
  return {
    info: state.SchoolModel.info,
  }
}
//连接
export default connect(mapStateToProps)(SchoolAnalysis);
