import React from 'react'
import './index.less'
import { Button, Modal } from 'antd'
import ReactToPrint from 'react-to-print'
import { getDomain } from 'src/utils/common'

class BgImgPrint extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  render() {
    return (
      <Modal
        width={this.props.type === 'vertical' ? 850 : 1170}
        wrapClassName="background-img-print"
        visible={true}
        onCancel={this.props.hideModal}
        cancelText="取消"
      >
        <div className="background-img-print-header">
          <ReactToPrint
            trigger={() => <Button size="small">打印</Button>}
            content={() => this.myRef.current}
          />
        </div>
        <div
          className="background-img-print-content"
          ref={this.myRef}
          style={{
            backgroundImage: `url(${getDomain()}${this.props.url})`,
            width: this.props.type === 'vertical' ? '800px' : '1120px',
            height: this.props.type === 'vertical' ? '1130px' : '792px',
          }}
        ></div>
      </Modal>
    )
  }
}

export default BgImgPrint
