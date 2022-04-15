import React from 'react';

import {Pie} from '@ant-design/charts';

import {connect} from 'umi';


class GenderAnalysis extends React.Component {


  //初始化render之后只执行一次
  componentDidMount() {
    // 声明一个自定义事件
    // 在组件装载完成以后

    const {dispatch} = this.props;
    // //调用Model
    dispatch({
      type: 'GenderModel/getInfo',
      payload: {},
    });
  }

  render() {
    console.log(this.props.info)
    const data = this.props.info;
    const config = {
      appendPadding: 10,
      data,
      angleField: 'count_n',
      colorField: 'genderKind',
      radius: 0.8,
      label: {
        type: 'outer',
      },
      interactions: [
        {
          type: 'element-active',
        },
      ],
    };
    return <Pie {...config} />;
  }
}


//设置绑定的返回数据
const mapStateToProps = (state) => {
  return {
    info: state.GenderModel.info,
  }
}
//连接
export default connect(mapStateToProps)(GenderAnalysis);
