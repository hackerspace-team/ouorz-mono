import Head from 'next/head'
import React from 'react'
import Content from '~/components/Content'
import { GetServerSideProps } from 'next'
import List from '~/components/List'
import Top from '~/components/Top'
import { getApi } from '~/utilities/Api'

interface Sticky {
  stickyNotFound: boolean
  stickyPosts: any
}

export default function Home({ stickyNotFound, stickyPosts }: Sticky) {
  return (
    <div>
      <Head>
        <title>TonyHe</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
      </Head>
      <Content>
        <div className="xl:mt-20 mt-0 xl:pt-0 pt-24">
          <div>
            <h1 className="font-medium text-3xl leading-14 xl:text-1 text-black dark:text-white tracking-wide mb-0.5">
              <span className="hover:animate-spin inline-block cursor-pointer">
                👋
              </span>{' '}
              Hi, I{"'"}m TonyHe
            </h1>
            <p className="text-3 xl:text-2 text-gray-500 dark:text-gray-200 leading-14 tracking-wide font-light">
              I{"'"}m a developer, blogger, podcaster and undergraduate student
              at the University of Waterloo, Class of 2025, Honors Mathematics
            </p>
          </div>
          <Top></Top>
        </div>
        <div className="mt-10">
          {!stickyNotFound && <List posts={stickyPosts} sticky={true}></List>}
        </div>
        <div className="mt-5">
          <List type="index"></List>
        </div>
      </Content>
    </div>
  )
}

// Get sticky posts rendered on the server side
export const getServerSideProps: GetServerSideProps = async () => {
  const resSticky = await fetch(
    getApi({
      sticky: true,
      perPage: 10,
      cateExclude: '5,2,74',
    })
  )
  const dataSticky = await resSticky.json()

  let stickyNotFound = false

  if (!dataSticky) {
    stickyNotFound = true
  }

  return {
    props: {
      stickyNotFound: stickyNotFound,
      stickyPosts: dataSticky,
    },
  }
}