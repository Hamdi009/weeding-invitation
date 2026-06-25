import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import {join} from 'node:path';
import {promises as fs} from 'node:fs';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
app.use(express.json());

// RSVP Storage Configuration
const rsvpsFilePath = join(process.cwd(), 'rsvps.json');

interface RSVP {
  id: string;
  name: string;
  email: string;
  attendance: 'attending' | 'declined';
  guests: number;
  dietary: string;
  message: string;
  createdAt: string;
}

// Load existing RSVPs or initialize empty array
async function loadRSVPs(): Promise<RSVP[]> {
  try {
    const data = await fs.readFile(rsvpsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save RSVPs to file
async function saveRSVPs(rsvps: RSVP[]): Promise<boolean> {
  try {
    await fs.writeFile(rsvpsFilePath, JSON.stringify(rsvps, null, 2), 'utf-8');
    return true;
  } catch {
    return false;
  }
}

// API endpoint to submit a new RSVP
app.post('/api/rsvp', async (req, res) => {
  try {
    const {name, email, attendance, guests, dietary, message} = req.body;

    if (!name || !attendance) {
      res.status(400).json({success: false, error: 'Name and attendance are required'});
      return;
    }

    const rsvps = await loadRSVPs();
    const newRSVP: RSVP = {
      id: Math.random().toString(36).substring(2, 11),
      name,
      email: email || '',
      attendance,
      guests: Number(guests) || 1,
      dietary: dietary || '',
      message: message || '',
      createdAt: new Date().toISOString()
    };

    rsvps.push(newRSVP);
    await saveRSVPs(rsvps);

    res.status(200).json({success: true, data: newRSVP});
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({success: false, error: errMsg});
  }
});

// API endpoint to get all RSVPs (with security check / passcode)
app.get('/api/rsvps', async (req, res) => {
  try {
    const code = req.query['code'];
    const rsvps = await loadRSVPs();

    // If they pass 'HE2027', give them full list, else just give the publicly visible well-wishes messages
    if (code === 'HE2027' || code === 'admin') {
      res.status(200).json({success: true, data: rsvps});
    } else {
      // Return public guest book wishes
      const publicWishes = rsvps
        .filter(r => r.message && r.message.trim().length > 0)
        .map(r => ({
          name: r.name,
          message: r.message,
          attendance: r.attendance,
          createdAt: r.createdAt
        }));
      res.status(200).json({success: true, data: publicWishes});
    }
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({success: false, error: errMsg});
  }
});

const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
