import rateLimit from 'express-rate-limit';

export const defaultRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // Milisecond // 1 min
  max: 20, // Limit each IP to 20 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: (req, res) =>
    res.json({
      status: 429,
      data: 'Too many requests, please try again later',
    }),
});

export const restrictRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // Milisecond // 1 hour
  max: 3, // Limit each IP to 3 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: (req, res) =>
    res.json({
      status: 429,
      data: 'Your IP is blocked, please try again later',
    }),
});
