import React from 'react'
import './SearchPage.css'
import Gallery from '../../components/gallery/gallery'
import { useSearchParams } from 'react-router'
function SearchPage() {
  const [searchParams]=useSearchParams();
  const search=searchParams.get("search")
  const boardid=searchParams.get("boardid")
  return (
    <Gallery search={search} boardid={boardid} />
  )
}

export default SearchPage