import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import serverless from "serverless-http";
import { createPattern } from "./processor/tprocessor";
import { handleSubmission } from "./services/github";
import Data from "./src/Data";
import MegaMenu from "./src/MegaMenu";
import PatternBuilder from "./src/PatternBuilder/PatternBuilder";
import PatternBuilderSubmitted from "./src/PatternBuilder/PatternBuilderSubmitted";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "./build")));

const markup = fs.readFileSync(__dirname + "/index.html",
  "utf8"
);

app.get("/api", (req, res) => {
  Data().then(menuData => {
    const html = renderToString(<MegaMenu menu={menuData} />);
    res.json({
      pattern: 'Mega Menu',
      html_markup: html
    });
  });
});

app.get("/", (req, res) => {
  Data().then(menuData => {
    const html = renderToString(<MegaMenu menu={menuData} />);
    res.send(markup.replace("<!--App-->", html));
  });
  handleSubmission({ name: 'Somes NAMES that a patterna' });
});

app.get("/pattern-builder", (req, res) => {
  const html = renderToString(<PatternBuilder />);
  res.send(markup.replace("<!--App-->", html));
});

app.post("/pattern-submitted", (req, res) => {
  createPattern(req.body);
  const html = renderToString(<PatternBuilderSubmitted />);
  res.send(markup.replace("<!--App-->", html));
});

module.exports.ssr = serverless(app);
