import { rest } from "msw";
import { API_BASE_ADDRESS } from "../src/models";

const postHandlers = [
  rest.get(`${API_BASE_ADDRESS}blogs`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "mock id",
          title: "mock title",
          category: "mock category",
          description: "mock description",
          body: "mock body",
          createAt: "2022/06/03",
          updateAt: "2022/06/03",
        },
      ])
    );
  }),

  rest.get(`${API_BASE_ADDRESS}blogs/:blogId`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: "mock id",
        title: "mock title",
        category: "mock category",
        description: "mock description",
        body: "mock body",
        createAt: "2022/06/03",
        updateAt: "2022/06/03",
      })
    );
  }),

  rest.delete(`${API_BASE_ADDRESS}blogs/:blogId`, (req, res, ctx) => {
    return res(ctx.set("Access-Control-Allow-Origin", "*"));
  }),

  rest.put(`${API_BASE_ADDRESS}blogs/:blogId`, (req, res, ctx) => {
    return res(ctx.set("Access-Control-Allow-Origin", "*"));
  }),

  rest.post(`${API_BASE_ADDRESS}blogs/:blogId`, (req, res, ctx) => {
    return res(
      ctx.set("Access-Control-Allow-Origin", "*"),
      ctx.json({
        id: "mock id",
        title: "mock title",
        category: "mock category",
        description: "mock description",
        body: "mock body",
        createAt: "2022/06/03",
        updateAt: "2022/06/03",
      })
    );
  }),
];

const accountHandlers = [
  rest.post(`${API_BASE_ADDRESS}login`, (req, res, ctx) => {
    return res(ctx.json('""'));
  }),

  rest.post(`${API_BASE_ADDRESS}logout`, (req, res, ctx) => {}),
  rest.post(`${API_BASE_ADDRESS}CheckLogged`, (req, res, ctx) => {
    return res(ctx.set("Access-Control-Allow-Origin", "*"));
  }),
];

export const handlers = [...postHandlers, ...accountHandlers];
