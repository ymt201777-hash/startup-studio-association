import { describe, it, expect } from 'vitest';
import { getStartups, getStudios, getReports, getStatistics } from './lib/notion';

describe('Notion API Integration', () => {
  it('should fetch startups data', async () => {
    const startups = await getStartups();
    expect(startups).toBeDefined();
    expect(Array.isArray(startups)).toBe(true);
    expect(startups.length).toBeGreaterThan(0);
    
    // Check structure of first startup
    if (startups.length > 0) {
      const startup = startups[0];
      expect(startup).toHaveProperty('id');
      expect(startup).toHaveProperty('name');
      expect(startup).toHaveProperty('studio');
      expect(startup).toHaveProperty('category');
      expect(startup).toHaveProperty('year');
      expect(startup).toHaveProperty('funding');
      expect(startup).toHaveProperty('stage');
      expect(startup).toHaveProperty('description');
    }
  });

  it('should fetch studios data', async () => {
    const studios = await getStudios();
    expect(studios).toBeDefined();
    expect(Array.isArray(studios)).toBe(true);
    expect(studios.length).toBeGreaterThan(0);
    
    // Check structure of first studio
    if (studios.length > 0) {
      const studio = studios[0];
      expect(studio).toHaveProperty('id');
      expect(studio).toHaveProperty('name');
      expect(studio).toHaveProperty('type');
      expect(studio).toHaveProperty('startupCount');
      expect(studio).toHaveProperty('exitCount');
      expect(studio).toHaveProperty('totalFunding');
      expect(studio).toHaveProperty('description');
    }
  });

  it('should fetch reports data', async () => {
    const reports = await getReports();
    expect(reports).toBeDefined();
    expect(Array.isArray(reports)).toBe(true);
    expect(reports.length).toBeGreaterThan(0);
    
    // Check structure of first report
    if (reports.length > 0) {
      const report = reports[0];
      expect(report).toHaveProperty('id');
      expect(report).toHaveProperty('title');
      expect(report).toHaveProperty('date');
      expect(report).toHaveProperty('description');
      expect(report).toHaveProperty('pdfUrl');
    }
  });

  it('should calculate statistics correctly', async () => {
    const statistics = await getStatistics();
    expect(statistics).toBeDefined();
    expect(statistics).toHaveProperty('startupCount');
    expect(statistics).toHaveProperty('studioCount');
    expect(statistics).toHaveProperty('totalFunding');
    expect(statistics).toHaveProperty('exitCount');
    
    expect(statistics.startupCount).toBeGreaterThan(0);
    expect(statistics.studioCount).toBeGreaterThan(0);
    expect(statistics.totalFunding).toBeGreaterThanOrEqual(0);
    expect(statistics.exitCount).toBeGreaterThanOrEqual(0);
  });

  it('should have valid stage values', async () => {
    const startups = await getStartups();
    const validStages = ['Seed', 'Pre-Series A', 'Series A', 'Series B', 'Series C+', 'IPO', 'M&A'];
    
    startups.forEach(startup => {
      expect(validStages).toContain(startup.stage);
    });
  });

  it('should have valid studio types', async () => {
    const studios = await getStudios();
    const validTypes = ['独立系', '大企業系', 'VC系', '大学系'];
    
    studios.forEach(studio => {
      expect(validTypes).toContain(studio.type);
    });
  });
});
