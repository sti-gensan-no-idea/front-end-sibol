# Chatbase Backend Implementation Example

This file contains example backend code for implementing secure Chatbase integration. 
**This is for reference only and should be implemented in your actual backend server.**

## Node.js/Express Example

```javascript
// backend/controllers/chatbaseController.js
import crypto from 'crypto';

// Your Chatbase secret key - store this securely in environment variables
const CHATBASE_SECRET = process.env.CHATBASE_SECRET || 'pfw7pnjbihkh2cidjhzghnijzz6kki4c';

/**
 * Generate HMAC hash for Chatbase identity verification
 */
function generateChatbaseHash(userId) {
  return crypto
    .createHmac('sha256', CHATBASE_SECRET)
    .update(userId)
    .digest('hex');
}

/**
 * API endpoint to get Chatbase configuration for authenticated user
 * Route: GET /api/user/chatbase-config
 */
export async function getChatbaseConfig(req, res) {
  try {
    // Ensure user is authenticated (implement your auth middleware)
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = req.user.id || req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Generate secure hash
    const userHash = generateChatbaseHash(userId);

    // Prepare user metadata (limit to 1000 characters total)
    const metadata = {
      name: req.user.name || req.user.firstName + ' ' + req.user.lastName || undefined,
      email: req.user.email || undefined,
      role: req.user.role || 'client',
      company: req.user.company || 'Atuna Real Estate',
      plan: req.user.subscription?.plan || 'standard'
    };

    // Ensure metadata doesn't exceed 1000 characters
    const metadataString = JSON.stringify(metadata);
    if (metadataString.length > 1000) {
      console.warn('User metadata exceeds 1000 characters, truncating...');
      // Keep only essential fields
      const essentialMetadata = {
        name: metadata.name,
        email: metadata.email,
        role: metadata.role
      };
      Object.assign(metadata, essentialMetadata);
    }

    const response = {
      user_id: userId,
      user_hash: userHash,
      user_metadata: metadata
    };

    res.json(response);
  } catch (error) {
    console.error('Error generating Chatbase config:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

## Route Setup Example

```javascript
// backend/routes/chatbase.js
import express from 'express';
import { getChatbaseConfig } from '../controllers/chatbaseController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Protected route for getting Chatbase config
router.get('/api/user/chatbase-config', authenticateToken, getChatbaseConfig);

export default router;
```

## Frontend Service Update

To use the backend endpoint, update your frontend ChatbaseService:

```javascript
// In your ChatbaseService generateUserHash method
async generateUserHash(userId) {
  try {
    const response = await fetch('/api/user/chatbase-config', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get Chatbase config from server');
    }

    const config = await response.json();
    return config.user_hash;
  } catch (error) {
    console.error('Error getting Chatbase config:', error);
    throw error;
  }
}
```

## Environment Variables

Make sure to set these in your backend:

```bash
CHATBASE_SECRET=pfw7pnjbihkh2cidjhzghnijzz6kki4c
```

## Security Notes

1. **Never expose your secret key** in frontend code
2. **Always validate user authentication** before generating hashes
3. **Use HTTPS** for all API requests
4. **Limit metadata size** to 1000 characters total
5. **Sanitize user input** before including in metadata
