import React from 'react'
import { Helmet } from 'react-helmet-async'

import CategoryListView from 'src/sections/category/view/category-list-view'

export default function CategoryListPage() {
  return (
    <>
      <Helmet>
        <title> Tổng quan: Danh sách thể loại</title>
      </Helmet>

      <CategoryListView />
    </>
  )
}
