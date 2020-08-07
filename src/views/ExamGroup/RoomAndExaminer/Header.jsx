import React from 'react'
import { Button, Input } from 'antd'
import ListHeaderCustom from 'src/components/ListHeaderCustom'
import ListHeaderLeft from 'src/components/ListHeaderLeft'
import ListHeaderRightCustom from 'src/components/ListHeaderRightCustom'

const Header = ({ bindExaminers, setSearch }) => {
  return (
    <ListHeaderCustom>
      <ListHeaderLeft>
        <Button type="primary" onClick={bindExaminers}>
          绑定
        </Button>
      </ListHeaderLeft>
      <ListHeaderRightCustom>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="请输入考官姓名"
          style={{ width: 220 }}
        />
        <Button>搜索</Button>
      </ListHeaderRightCustom>
    </ListHeaderCustom>
  )
}

export default Header
