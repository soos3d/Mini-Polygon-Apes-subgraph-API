# Mini Polygon Apes subgraph API

This is a mini API to use with the [Polygon Apes subgraph](https://github.com/soos3d/polygon-apes-subgraph).

## Quick start

Clone this repository:

```sh
git clone https://github.com/soos3d/Mini-Polygon-Apes-subgraph-API.git
```

Install dependencies:

```sh
npm ci
```

Edit `.env.sample` and add your `YOUR_SUBGRAPH_QUERY_URL`, then rename to `.env`:

```env
SUBGRAPH_URL="YOUR_SUBGRAPH_QUERY_URL"
```

Try it out:

```sh
npm run test
```