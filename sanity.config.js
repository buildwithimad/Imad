'use client'

/**
 * Sanity Studio configuration
 * Mounted at /studio
 */

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,

  schema,

  plugins: [
    deskTool({
      structure, // ✅ custom structure goes here
    }),
    visionTool({
      defaultApiVersion: apiVersion,
    }),
  ],
})
