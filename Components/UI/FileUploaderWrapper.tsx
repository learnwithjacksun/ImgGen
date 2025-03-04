"use client";

import React from "react";
import Container from "../Container";
import ImageOptions from "./ImageOptions";
import Content from "../Content";
export default function FileUploaderWrapper() {
  return (
    <>
      <div className="my-10">
       
        <Container>
          <ImageOptions />
          <Content />
        </Container>
      </div>
    </>
  );
}
