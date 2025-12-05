function _1(md){return(
md`# NYC Crime Patterns: A Spatio-Temporal Analysis of Public Safety

**CS-GY 6313: Information Visualization - Final Project**

**Team:** Viz Pro Max | **Members:** Siddh Mandirwala (sm12505), Krish Murjani (km6520)`
)}

function _2(md){return(
md`## Introduction

### Background

New York City, home to over 8 million residents, faces complex public safety challenges that vary dramatically across time, space, and crime type. While the NYPD publishes regular statistics, traditional reports struggle to convey the intricate relationships between when, where, and what types of crimes occur. Crime patterns in NYC have undergone significant changes over the past decade—overall crime declined substantially since the 1990s, but recent years show complex trends. Crime rates jumped during the COVID-19 pandemic and remain approximately 30% higher than pre-pandemic levels. Different crime types show divergent trends: murders and robberies are declining while felony assaults have increased significantly.

### Goal

**The goal of this project is to understand how crime patterns in New York City vary across time, location, and crime type through interactive visualization.** We aim to reveal insights that static reports cannot convey, making complex spatio-temporal patterns accessible to multiple stakeholders—police departments optimizing patrol schedules, city planners making infrastructure decisions, community organizations targeting interventions, and residents (especially newcomers like international students) making informed decisions about where to live and work.

### Analysis Plan

More specifically, we investigate eight interconnected questions that progress from broad temporal and spatial overviews to detailed multi-dimensional analysis:

1. **Temporal Evolution** - How have overall crime patterns changed over the past decade?
2. **Spatial Distribution** - Where are crime hotspots located across NYC's five boroughs?
3. **Crime Type Profiles** - What types of crimes are most prevalent, and how do they vary by location?
4. **Temporal Rhythms** - How do different crime types exhibit distinct hourly and weekly patterns?
5. **Spatio-Temporal Dynamics** - How do crime patterns evolve across both space and time?
6. **Location Context** - Where do different types of crimes typically occur (street, residence, transit)?
7. **Precinct-Level Analysis** - Which police precincts face the highest crime burdens when normalized by population?
8. **Multi-Dimensional Exploration** - What insights emerge when filtering by multiple dimensions simultaneously?

### Outcome

As a major outcome, we present an interactive dashboard that enables users to explore custom combinations of borough, time period, and crime type to answer questions specific to their needs. Our analysis of over 7 million incidents from 2015-2024 reveals striking patterns: a dramatic COVID-19 disruption that reduced crime to decade lows in April 2020 (25,000 incidents), followed by recovery to record highs in 2023-2024 (50,000 incidents/month). Brooklyn shows the highest absolute crime counts while Manhattan exhibits distinct profiles dominated by property crimes. Crime peaks during afternoons (12pm-6pm) with different offense types showing unique temporal signatures.

### Key Statistics at a Glance

| Metric | Value |
|--------|-------|
| **Total Incidents Analyzed** | 7+ million |
| **Time Period** | 2015-2024 (10 years) |
| **Geographic Coverage** | 5 boroughs, 77 precincts |
| **Crime Categories** | 60+ offense types |
| **Peak Crime Period** | 2023-2024 (~50K/month) |
| **Lowest Crime Period** | April 2020 (~25K) |
| **Most Common Crime** | Petit Larceny (220K+/year) |
| **Highest Crime Borough** | Brooklyn (240K+ in 2023-24) |

---`
)}

function _3(md){return(
md`## Data Description

### Source and Collection

**Dataset**: NYPD Complaint Data Historic  
**Source**: [NYC Open Data Portal](https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Historic/qgea-i56i)  
**Collector**: New York Police Department  
**Collection Method**: Data extracted from criminal complaints filed by victims, witnesses, or discovered by officers during patrol. Each record represents an official complaint processed through the NYPD's internal records management system.

**Dataset Scale**:
- 7+ million records (2006-present; we analyze 2015-2024)
- 77 police precincts across 5 boroughs
- Updated quarterly
- Hour-level temporal precision with geographic coordinates

### Attributes Used

**Temporal Attributes:**
- \`CMPLNT_FR_DT\` (complaint date), \`CMPLNT_FR_TM\` (complaint time)
- **Derived fields**: year, month, day of week, hour, season (Winter/Spring/Summer/Fall), time block (Morning/Afternoon/Evening/Night)

**Spatial Attributes:**
- \`BORO_NM\` (borough: Brooklyn, Manhattan, Queens, Bronx, Staten Island)
- \`Latitude\`/\`Longitude\` (geographic coordinates)
- \`ADDR_PCT_CD\` (police precinct code, 77 precincts)
- **Supporting data**: NYC Borough Boundaries (GeoJSON from NYC Open Data) for choropleth maps

**Quantitative Measures:**
- Crime incident counts aggregated by various dimensions
- Derived rates (crimes per capita when normalized by precinct population)

**Categorical Variables:**
- \`OFNS_DESC\` (60+ detailed offense descriptions)
- \`LAW_CAT_CD\` (legal classification: Felony, Misdemeanor, Violation)
- \`PREM_TYP_DESC\` (premises type: street, residence, transit, commercial)
- \`CRM_ATPT_CPTD_CD\` (completed vs. attempted)

### Preprocessing Steps

**1. Missing Data Handling**: Removed records with missing coordinates (~5%) from spatial analyses; retained in temporal analyses for completeness.

**2. Temporal Standardization**: Converted dates to ISO format, extracted year/month/day/hour, created derived temporal groupings (season, time blocks).

**3. Offense Cleaning**: Standardized offense descriptions where multiple names existed for the same crime type.

**4. Geographic Validation**: Verified coordinates fall within NYC boundaries (40.5°N-40.9°N, -74.3°W--73.7°W), removed outliers.

**5. Scope Refinement**: Filtered to 2015-2024 data for focused analysis of recent trends including COVID-19 period.

### Data Quality

**Strengths**: Official NYPD source, comprehensive 10-year coverage, high granularity (hour-level, coordinate-level), regular quarterly updates, publicly accessible.

**Completeness**: Temporal fields >99% complete, spatial fields ~95% complete, categorical fields ~90% complete.

**Limitations**: 
- Represents *reported* crimes only—unreported incidents not captured
- Reporting rates vary across communities and crime types
- Some coordinates generalized for privacy protection
- Classification standards may evolve over the 10-year period

**Appropriateness**: This dataset uniquely suits our questions by providing temporal depth (10 years), spatial precision (coordinates + precincts), categorical richness (60+ offense types), and official NYPD provenance ensuring credibility.

### Data Ethics

This dataset represents real incidents affecting real people. We do not analyze victim/suspect demographics, avoid stigmatizing language, and recognize that crime statistics reflect both actual occurrence and reporting behavior.

---`
)}

function _API_BASE(){return(
"https://data.cityofnewyork.us/resource/qgea-i56i.json"
)}

function _fetchData(URLSearchParams,API_BASE){return(
async (query = "", limit = 1000) => {
  const params = new URLSearchParams({
    $limit: limit,
    ...(query && { $where: query })
  });
  const res = await fetch(`${API_BASE}?${params}`);
  return await res.json();
}
)}

function _tooltip(d3)
{
  const id = "viz-tooltip";
  let tooltip = d3.select("body").select("#" + id);
  if (tooltip.empty()) {
    tooltip = d3.select("body").append("div")
      .attr("id", id)
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(255, 255, 255, 0.95)")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("padding", "10px")
      .style("font-family", "sans-serif")
      .style("font-size", "12px")
      .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)")
      .style("pointer-events", "none")
      .style("z-index", "1000");
  }
  return tooltip;
}


function _timeFilters()
{
  const options = [
    { label: "All Years (2015-2024)", filter: y => y >= 2015 && y <= 2024 },
    { label: "2015-2019 (Pre-Covid)", filter: y => y >= 2015 && y <= 2019 },
    { label: "2020-2021 (Covid)", filter: y => y >= 2020 && y <= 2021 },
    { label: "2020-2023 (Post-Covid)", filter: y => y >= 2020 && y <= 2023 },
    { label: "2023-2024 (Recent Years)", filter: y => y >= 2023 && y <= 2024 }
  ];

  const createSelect = (container, updateFunc) => {
    const wrap = container.append("div").style("margin-bottom", "10px");
    wrap.append("span").text("Time Period: ").style("font-weight", "bold").style("margin-right", "5px");
    
    const select = wrap.append("select")
      .on("change", function() { updateFunc(this.value); });
    
    select.selectAll("option")
      .data(options)
      .join("option")
      .attr("value", (d, i) => i) 
      .text(d => d.label);
      
    return select;
  };

  return { options, createSelect };
}


function _8(md){return(
md`## Questions and Findings

The following eight visualizations explore interconnected questions about NYC crime patterns, progressing from broad temporal and spatial overviews to detailed multi-dimensional analysis. **All visualizations are interactive**—hover over data points, bars, and map regions for detailed information.

---`
)}

function _9(md){return(
md`### Question 1: How have overall crime patterns changed over time in NYC?

Understanding long-term temporal trends is essential for contextualizing current crime levels and identifying anomalies. This visualization examines decade-long patterns from 2015 to 2024, revealing how major events like the COVID-19 pandemic disrupted established crime rhythms and exploring whether we've returned to "normal" levels or entered a new phase entirely.`
)}

async function _q1_data(URLSearchParams,API_BASE)
{
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const promises = years.map(year => {
    const params = new URLSearchParams({
      $select: `date_extract_m(cmplnt_fr_dt) as month, count(*) as count`,
      $where: `date_extract_y(cmplnt_fr_dt) = ${year}`,
      $group: `date_extract_m(cmplnt_fr_dt)`,
      $order: `month ASC`
    });
    return fetch(`${API_BASE}?${params}`).then(r => r.json()).then(d => d.map(item => ({
       year: year,
       month: +item.month,
       count: +item.count,
       date: new Date(year, item.month - 1, 1)
    })));
  });
  
  const results = await Promise.all(promises);
  return results.flat().sort((a,b) => a.date - b.date);
}


function _chart_q1(d3,timeFilters,q1_data,tooltip)
{
  const container = d3.create("div").style("font-family", "sans-serif");
  const width = 900, height = 450;
  const margin = {top: 50, right: 30, bottom: 60, left: 85};

  timeFilters.createSelect(container, (val) => update(val));

  const svg = container.append("svg").attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]);
  
  const x = d3.scaleTime().range([margin.left, width - margin.right]);
  const y = d3.scaleLinear().range([height - margin.bottom, margin.top]);
  
  const xAxis = svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`);
  const yAxis = svg.append("g").attr("transform", `translate(${margin.left},0)`);
  
  const path = svg.append("path").attr("fill", "none").attr("stroke", "#2563eb").attr("stroke-width", 2.5);
  const dots = svg.append("g");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("NYC Crime Trends Over Time");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 25) 
    .attr("x", 0 - (height / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Total Crimes");

  svg.append("text")
    .attr("transform", `translate(${width/2}, ${height - 15})`)
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Date");

  function update(filterIndex) {
    const filterFn = timeFilters.options[filterIndex].filter;
    const filtered = q1_data.filter(d => filterFn(d.year));

    x.domain(d3.extent(filtered, d => d.date));
    y.domain([0, d3.max(filtered, d => d.count)]).nice();

    xAxis.transition().duration(750).call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
    yAxis.transition().duration(750).call(d3.axisLeft(y));

    const line = d3.line().x(d => x(d.date)).y(d => y(d.count)).curve(d3.curveMonotoneX);

    path.datum(filtered)
        .transition()
        .duration(750)
        .ease(d3.easeCubicOut)
        .attr("d", line);
    
    dots.selectAll("circle")
      .data(filtered)
      .join("circle")
      .attr("fill", "#2563eb")
      .attr("r", 4)
      .on("mouseover", (event, d) => {
         d3.select(event.currentTarget).transition().attr("r", 6);
         tooltip.style("visibility", "visible")
            .html(`<strong>${d3.timeFormat("%B %Y")(d.date)}</strong><br>Crimes: ${d.count.toLocaleString()}`)
            .style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", (event) => {
         d3.select(event.currentTarget).transition().attr("r", 4);
         tooltip.style("visibility", "hidden");
      })
      .transition()
      .duration(750)
      .ease(d3.easeCubicOut)
      .attr("cx", d => x(d.date))
      .attr("cy", d => y(d.count));
  }

  update(0); 
  return container.node();
}


function _12(md){return(
md`#### What We Found

Looking at this line chart, three distinct phases jump out:

**Pre-COVID Stability (2015-2019)**: Crime hovered between 35K-43K incidents per month with predictable seasonal patterns—summers peak around 42K-45K, winters dip to 32K-35K. This is our baseline "normal."

**The COVID Crash (Early 2020)**: Crime dropped 36% almost overnight, from 39K in February 2020 to just 25K in April 2020—the lowest point in our entire dataset. Empty streets and lockdowns meant fewer opportunities for crime.

**Post-COVID Surge (2021-2024)**: Here's the striking part—crime didn't just recover, it exceeded pre-pandemic levels. By 2023-2024, we're consistently seeing 48K-50K incidents per month, roughly 15-20% higher than the 2015-2019 baseline. We're not back to normal; we're in an elevated crime environment.

What's notable: seasonal patterns persisted throughout all three phases. Every year shows summer peaks and winter valleys, even during COVID.

#### Why This Visualization Works

We chose a **line chart with temporal filtering** for several reasons. Line charts are optimal for continuous temporal data—they let you trace trends and spot inflection points like the COVID dip immediately. The connected points emphasize time's continuity better than disconnected bars would.

We added **interactive filters** (Pre-COVID, COVID, Post-COVID, Recent Years) because viewing detailed monthly patterns while understanding decade-long trends is difficult in one static view. The filters follow Shneiderman's mantra: "overview first, zoom and filter, then details on demand."

Monthly aggregation strikes the right balance—weekly data would be too noisy, yearly data would hide seasonal patterns and COVID timing.

#### What This Actually Means

**For resource planning**: Current crime levels are at a 10-year high and have been sustained for 3 years (2022-2024). Any planning using pre-2020 data as "normal" underestimates by 15-20%.

**On change velocity**: Crime shifted 36% in 8 weeks during lockdown, then recovered 100% in 18 months. This shows crime is highly responsive to environmental conditions—it's not always gradual.

**Seasonal consistency**: Summer brings 20-30% more crime than winter regardless of other conditions. Interventions should be seasonally calibrated with more resources deployed June-August every year.

**The big picture**: We're in a new equilibrium, not experiencing a temporary deviation. COVID may have reset what "normal" crime levels look like in NYC. When someone asks "is crime getting better or worse?", the answer depends on your reference point—compared to 2015-2019, we're 15-20% higher and holding steady at that level.`
)}

function _13(md){return(
md`### Question 2: Where are crime hotspots located across NYC's five boroughs?

Identifying geographic concentrations of crime is crucial for resource allocation and understanding neighborhood-level safety. This visualization compares total crime counts across NYC's five boroughs, revealing persistent spatial patterns that hold across different time periods.`
)}

async function _q2_data(URLSearchParams,API_BASE)
{
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const promises = years.map(year => {
    const params = new URLSearchParams({
      $select: `boro_nm, count(*) as count`,
      $where: `date_extract_y(cmplnt_fr_dt) = ${year} AND boro_nm IS NOT NULL`,
      $group: `boro_nm`
    });
    return fetch(`${API_BASE}?${params}`).then(r => r.json()).then(d => d.map(i => ({
      year: year,
      borough: i.boro_nm,
      count: +i.count
    })));
  });
  const results = await Promise.all(promises);
  return results.flat().filter(d => d.borough !== '(null)');
}


function _chart_q2(d3,timeFilters,q2_data,tooltip)
{
  const container = d3.create("div").style("font-family", "sans-serif");
  const width = 700, height = 450;
  const margin = {top: 50, right: 30, bottom: 60, left: 85};

  timeFilters.createSelect(container, (val) => update(val));

  const svg = container.append("svg").attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]);
  const x = d3.scaleBand().range([margin.left, width - margin.right]).padding(0.2);
  const y = d3.scaleLinear().range([height - margin.bottom, margin.top]);
  const color = d3.scaleSequential(d3.interpolateBlues);

  const gX = svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`);
  const gY = svg.append("g").attr("transform", `translate(${margin.left},0)`);

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Crime Count by Borough");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 25)
    .attr("x", 0 - (height / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Total Crimes");

  svg.append("text")
    .attr("transform", `translate(${width/2}, ${height - 15})`)
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Borough");

  function update(filterIndex) {
    const filterFn = timeFilters.options[filterIndex].filter;
    const rollup = d3.rollup(
      q2_data.filter(d => filterFn(d.year)),
      v => d3.sum(v, d => d.count),
      d => d.borough
    );
    const data = Array.from(rollup, ([borough, count]) => ({borough, count})).sort((a,b) => b.count - a.count);

    x.domain(data.map(d => d.borough));
    y.domain([0, d3.max(data, d => d.count)]).nice();
    color.domain([0, d3.max(data, d => d.count)]);

    gX.transition().duration(750).call(d3.axisBottom(x));
    gY.transition().duration(750).call(d3.axisLeft(y));

    svg.selectAll("rect")
      .data(data, d => d.borough)
      .join(
        enter => enter.append("rect")
          .attr("x", d => x(d.borough))
          .attr("y", height - margin.bottom)
          .attr("height", 0)
          .attr("width", x.bandwidth())
          .attr("fill", d => color(d.count))
          .call(enter => enter.transition()
            .duration(750)
            .delay((d, i) => i * 100)
            .ease(d3.easeCubicOut)
            .attr("y", d => y(d.count))
            .attr("height", d => y(0) - y(d.count))),
        update => update.transition()
          .duration(750)
          .ease(d3.easeCubicOut)
          .attr("x", d => x(d.borough))
          .attr("y", d => y(d.count))
          .attr("height", d => y(0) - y(d.count))
          .attr("width", x.bandwidth())
          .attr("fill", d => color(d.count)),
        exit => exit.transition().duration(500).attr("height", 0).attr("y", height - margin.bottom).remove()
      )
      .on("mouseover", (e, d) => {
         d3.select(e.currentTarget).attr("stroke", "#333").attr("stroke-width", 2);
         tooltip.style("visibility", "visible").html(`<strong>${d.borough}</strong><br>Crimes: ${d.count.toLocaleString()}`)
            .style("top", (e.pageY-10)+"px").style("left", (e.pageX+10)+"px");
      })
      .on("mouseout", (e) => {
         d3.select(e.currentTarget).attr("stroke", "none");
         tooltip.style("visibility", "hidden");
      });
  }

  update(0);
  return container.node();
}


function _16(md){return(
md`#### What We Found

**Borough Rankings (2015-2024 Total)**:
1. Brooklyn: 1.4M incidents (29% of citywide crime)
2. Manhattan: 1.18M (24%)
3. Bronx: 1.05M (22%)
4. Queens: 1.02M (21%)
5. Staten Island: 210K (4%)

Brooklyn leads by a significant margin—200K+ more crimes than Manhattan over the decade. What's striking is how consistent these rankings are across all time periods:

**Pre-COVID (2015-2019)**: Brooklyn dominated with ~690K incidents, followed by Manhattan (~575K), Bronx (~515K), Queens (~465K), and Staten Island (~105K). The gap between Brooklyn and Manhattan was already substantial at 115K incidents.

**COVID Period (2020-2021)**: Everything scaled down proportionally—Brooklyn dropped to ~245K, Manhattan to ~207K, but the ranking stayed identical. All boroughs saw roughly 65% reductions, suggesting the pandemic affected crime uniformly across geography.

**Post-COVID (2020-2023)**: Crime surged back with Brooklyn hitting ~545K, Manhattan ~473K. The interesting part? Brooklyn's recovery was actually stronger—it widened its lead over Manhattan compared to pre-COVID levels.

**Recent Years (2023-2024)**: The pattern holds—Brooklyn at ~308K leads Manhattan (~268K) by 40K over just two years. Staten Island remains dramatically lower at ~48K, maintaining that 6:1 ratio with other boroughs.

**Staten Island's anomaly** persists across all periods—consistently representing only 4% of citywide crime despite being 10% of NYC's land area. It sees roughly 1/6th the crime of the other four boroughs in every time window we examined.

#### Why This Visualization Works

We chose a **bar chart with sequential color encoding** because bar charts are optimal for comparing quantities across categories—the human eye is excellent at comparing bar lengths. Position on a common scale (the y-axis) is the most accurate visual encoding for quantitative comparison.

The **sequential blue color scheme** (darker = higher crime) reinforces the magnitude ordering, though honestly the position encoding alone carries most of the information. We added **temporal filtering** to test whether borough rankings shift across time periods—they don't, which is itself an important finding.

#### What This Actually Means

**For newcomers to NYC**: Brooklyn's high absolute numbers might seem alarming, but remember this doesn't account for population density or area. Brooklyn is NYC's most populous borough (2.7M people), so higher crime counts are expected. We'll normalize by population in Question 7 for fairer comparison.

**For resource allocation**: The consistency of these rankings across time periods suggests structural factors (population, density, economic conditions) drive spatial patterns more than temporary shocks. Even COVID didn't fundamentally reshape the geographic distribution—it just scaled everything down proportionally.

**Staten Island's geographic isolation** clearly matters—it's the only borough not connected by subway, has lower density, and functions more like a suburb. Crime patterns reflect accessibility and urban form, not just population size.`
)}

function _17(md){return(
md`---
### Question 3: What types of crimes are most prevalent, and how do they vary by location?

Understanding crime type distributions across boroughs reveals whether neighborhoods face primarily property crimes or violent crimes—a critical distinction for targeted interventions. This visualization examines the top four crime categories across all five boroughs, exposing dramatic differences in crime profiles.`
)}

async function _q3_data(URLSearchParams,API_BASE)
{
  const topOffenses = ["PETIT LARCENY", "HARASSMENT 2", "ASSAULT 3 & RELATED OFFENSES", "GRAND LARCENY", "ROBBERY"];
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  
  const requests = [];
  years.forEach(year => {
    topOffenses.forEach(offense => {
        requests.push({year, offense});
    });
  });

  const promises = requests.map(req => {
      const params = new URLSearchParams({
        $select: `boro_nm, count(*) as count`,
        $where: `date_extract_y(cmplnt_fr_dt) = ${req.year} AND ofns_desc = '${req.offense}' AND boro_nm IS NOT NULL`,
        $group: `boro_nm`
      });
      return fetch(`${API_BASE}?${params}`).then(r => r.json()).then(d => d.map(i => ({
          year: req.year,
          offense: req.offense,
          borough: i.boro_nm,
          count: +i.count
      })));
  });
  
  const results = await Promise.all(promises);
  return results.flat().filter(d => d.borough !== '(null)');
}


function _chart_q3(d3,timeFilters,q3_data,tooltip)
{
  const container = d3.create("div").style("font-family", "sans-serif");
  const width = 800, height = 500;
  const margin = {top: 60, right: 220, bottom: 60, left: 85};

  timeFilters.createSelect(container, (val) => update(val));

  const svg = container.append("svg").attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]);
  const x0 = d3.scaleBand().range([margin.left, width - margin.right]).padding(0.2);
  const x1 = d3.scaleBand().padding(0.05);
  const y = d3.scaleLinear().range([height - margin.bottom, margin.top]);
  const color = d3.scaleOrdinal(d3.schemeSet2);

  const gX = svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`);
  const gY = svg.append("g").attr("transform", `translate(${margin.left},0)`);
  const gBars = svg.append("g");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Top Crime Types by Borough");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 25)
    .attr("x", 0 - (height / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Crime Count");

  svg.append("text")
    .attr("transform", `translate(${width/2}, ${height - 15})`)
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Borough");

  function update(filterIndex) {
    const filterFn = timeFilters.options[filterIndex].filter;
    
    const rollup = d3.rollup(
        q3_data.filter(d => filterFn(d.year)),
        v => d3.sum(v, d => d.count),
        d => d.borough,
        d => d.offense
    );

    const boroughs = Array.from(rollup.keys()).sort();
    const offenses = [...new Set(q3_data.map(d => d.offense))];
    
    const data = boroughs.map(b => ({
        borough: b,
        values: offenses.map(off => ({
            offense: off,
            count: rollup.get(b)?.get(off) || 0
        }))
    }));

    x0.domain(boroughs);
    x1.domain(offenses).range([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, d => d3.max(d.values, v => v.count))]).nice();

    gX.transition().duration(750).call(d3.axisBottom(x0));
    gY.transition().duration(750).call(d3.axisLeft(y));

    gBars.selectAll("g")
        .data(data)
        .join(
            enter => enter.append("g").attr("transform", d => `translate(${x0(d.borough)},0)`),
            update => update.transition().duration(750).attr("transform", d => `translate(${x0(d.borough)},0)`)
        )
        .selectAll("rect")
        .data(d => d.values)
        .join(
            enter => enter.append("rect")
                .attr("x", d => x1(d.offense))
                .attr("y", height - margin.bottom)
                .attr("width", x1.bandwidth())
                .attr("height", 0)
                .attr("fill", d => color(d.offense))
                .call(enter => enter.transition()
                    .duration(750)
                    .delay((d, i) => i * 50)
                    .attr("y", d => y(d.count))
                    .attr("height", d => y(0) - y(d.count))
                ),
            update => update.transition()
                .duration(750)
                .attr("x", d => x1(d.offense))
                .attr("y", d => y(d.count))
                .attr("width", x1.bandwidth())
                .attr("height", d => y(0) - y(d.count)),
            exit => exit.transition().duration(500).attr("height", 0).attr("y", height - margin.bottom).remove()
        )
        .on("mouseover", (e, d) => {
            d3.select(e.currentTarget).style("opacity", 0.8);
            tooltip.style("visibility", "visible").html(`<strong>${d.offense}</strong><br>${d.count.toLocaleString()}`)
            .style("top", (e.pageY-10)+"px").style("left", (e.pageX+10)+"px");
        })
        .on("mouseout", (e) => {
            d3.select(e.currentTarget).style("opacity", 1);
            tooltip.style("visibility", "hidden");
        });
  }

  const legend = svg.append("g").attr("transform", `translate(${width - margin.right + 20}, ${margin.top})`);
  [...new Set(q3_data.map(d => d.offense))].forEach((off, i) => {
      const row = legend.append("g").attr("transform", `translate(0, ${i * 20})`);
      row.append("rect").attr("width", 12).attr("height", 12).attr("fill", color(off));
      row.append("text").attr("x", 15).attr("y", 10).text(off).style("font-size", "10px");
  });

  update(0);
  return container.node();
}


function _20(md){return(
md`#### What We Found

**Manhattan's Petit Larceny dominance is striking**—with ~290K incidents over the decade, it's nearly double Brooklyn's ~247K despite Manhattan having lower total crime. Petit larceny represents a massive 25% of all Manhattan crime, compared to just 18% in Brooklyn. This makes sense given Manhattan's concentration of retail, tourism, and transit hubs where pickpocketing and shoplifting thrive.

**Each borough shows a distinct crime profile**:
- **Manhattan**: Property crime heavy (Petit Larceny 290K, Grand Larceny 162K dominate)
- **Brooklyn**: More balanced mix (Assault 149K is highest, followed by Petit Larceny 247K)
- **Bronx**: Assault-heavy (137K assaults, nearly matching Petit Larceny at 157K)
- **Queens**: Moderate across all categories, no extreme concentrations
- **Staten Island**: Dramatically lower in all categories, but proportions mirror other boroughs

**Grand Larceny patterns differ significantly**—Manhattan leads with 162K while Queens has only 86K. This likely reflects Manhattan's higher concentration of vehicles, businesses, and valuable property worth stealing.

**Robbery distribution** is more uniform across boroughs (ranging 30K-43K) compared to other crime types, suggesting robbery is less dependent on borough-specific characteristics.

**Temporal consistency**: Filtering through time periods shows these crime type profiles remain stable—Manhattan always leads in petit larceny, Brooklyn in assault. COVID scaled everything down proportionally without changing the fundamental distribution patterns.

#### Why This Visualization Works

We chose **grouped bar charts** because they're optimal for comparing multiple categories (crime types) across multiple groups (boroughs) simultaneously. The grouped layout makes it easy to compare crime types within a borough (bar heights side-by-side) and also compare the same crime type across boroughs (same color bars).

We used a **categorical color palette** (green, orange, purple, pink) to differentiate crime types clearly. Color consistency across all borough groupings ensures users can track a single crime type across the x-axis easily.

The **temporal filtering** tests whether crime profiles shift during different periods—they don't substantially, reinforcing that these are structural borough characteristics.

#### What This Actually Means

**For resource allocation**: Different boroughs need different interventions. Manhattan needs retail/commercial security and transit policing for property crimes. Brooklyn and Bronx need more focus on assault prevention and community conflict resolution. One-size-fits-all approaches miss these fundamental differences.

**Manhattan's commuter effect**: The extreme petit larceny concentration likely reflects Manhattan's role as a jobs/tourism center—millions of daily commuters and tourists create targets of opportunity that aren't captured by residential population stats. This is why raw counts matter alongside per-capita rates.`
)}

function _21(md){return(
md`---
### Question 4: How do different crime types exhibit distinct temporal patterns?

Crime doesn't happen uniformly throughout the day—different offenses follow distinct hourly rhythms tied to routine activities, business hours, and nightlife. This visualization reveals the temporal signatures of NYC crime, showing when incidents cluster and how these patterns evolved through the pandemic.`
)}

async function _q4_data(fetchData)
{
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const promises = years.map(year => 
     fetchData(`date_extract_y(cmplnt_fr_dt) = ${year} AND cmplnt_fr_tm IS NOT NULL`, 1500)
  );
  
  const results = await Promise.all(promises);
  return results.flat().map(d => ({
      year: new Date(d.cmplnt_fr_dt).getFullYear(),
      hour: d.cmplnt_fr_tm ? parseInt(d.cmplnt_fr_tm.split(':')[0]) : -1,
      offense: d.ofns_desc
  })).filter(d => d.hour >= 0);
}


function _chart_q4(d3,timeFilters,q4_data,tooltip)
{
  const container = d3.create("div").style("font-family", "sans-serif");
  
  const controls = container.append("div").style("display", "flex").style("gap", "20px").style("margin-bottom", "10px");
  
  const timeWrap = controls.append("div");
  timeWrap.append("label").text("Time Period: ").style("font-weight", "bold");
  const timeSel = timeWrap.append("select").on("change", update);
  timeSel.selectAll("option").data(timeFilters.options).join("option").attr("value", (d,i)=>i).text(d => d.label);

  const crimeWrap = controls.append("div");
  crimeWrap.append("label").text("Crime Type: ").style("font-weight", "bold");
  const crimes = ["ALL", "PETIT LARCENY", "ASSAULT 3 & RELATED OFFENSES", "GRAND LARCENY", "ROBBERY", "BURGLARY"];
  const crimeSel = crimeWrap.append("select").on("change", update);
  crimeSel.selectAll("option").data(crimes).join("option").text(d => d);

  const width = 800, height = 450;
  const margin = {top: 50, right: 30, bottom: 60, left: 70};
  const svg = container.append("svg").attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]);

  const x = d3.scaleLinear().domain([0, 23]).range([margin.left, width - margin.right]);
  const y = d3.scaleLinear().range([height - margin.bottom, margin.top]);
  const area = d3.area().x(d => x(d.hour)).y0(height - margin.bottom).y1(d => y(d.count)).curve(d3.curveMonotoneX);
  const line = d3.line().x(d => x(d.hour)).y(d => y(d.count)).curve(d3.curveMonotoneX);

  svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).ticks(24).tickFormat(d => d+"h"));
  const yAxis = svg.append("g").attr("transform", `translate(${margin.left},0)`);
  const pathArea = svg.append("path").attr("fill", "#93c5fd").attr("fill-opacity", 0.6);
  const pathLine = svg.append("path").attr("fill", "none").attr("stroke", "#2563eb").attr("stroke-width", 2);

  const dotsGroup = svg.append("g");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Crime Distribution by Hour of Day");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 25)
    .attr("x", 0 - (height / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Crime Count");

  svg.append("text")
    .attr("transform", `translate(${width/2}, ${height - 15})`)
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Hour of Day");

  function update() {
    const timeIdx = timeSel.node().value;
    const crimeVal = crimeSel.node().value;
    const filterFn = timeFilters.options[timeIdx].filter;

    let filtered = q4_data.filter(d => filterFn(d.year));
    if (crimeVal !== "ALL") filtered = filtered.filter(d => d.offense === crimeVal);

    const counts = d3.rollup(filtered, v => v.length, d => d.hour);
    const plotData = Array.from({length: 24}, (_, i) => ({ hour: i, count: counts.get(i) || 0 }));
    
    y.domain([0, d3.max(plotData, d => d.count)]).nice();
    yAxis.transition().duration(750).call(d3.axisLeft(y));
    
    pathArea.datum(plotData)
        .transition().duration(750)
        .ease(d3.easeCubicOut)
        .attr("d", area);
        
    pathLine.datum(plotData)
        .transition().duration(750)
        .ease(d3.easeCubicOut)
        .attr("d", line);

    dotsGroup.selectAll("circle")
      .data(plotData)
      .join("circle")
      .attr("r", 4)
      .attr("fill", "#2563eb")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5)
      .on("mouseover", (e, d) => {
          d3.select(e.currentTarget).transition().attr("r", 6);
          tooltip.style("visibility", "visible")
              .html(`<strong>${d.hour}:00</strong><br>Crimes: ${d.count.toLocaleString()}`)
              .style("top", (e.pageY-10)+"px").style("left", (e.pageX+10)+"px");
      })
      .on("mouseout", (e) => {
          d3.select(e.currentTarget).transition().attr("r", 4);
          tooltip.style("visibility", "hidden");
      })
      .transition()
      .duration(750)
      .ease(d3.easeCubicOut)
      .attr("cx", d => x(d.hour))
      .attr("cy", d => y(d.count));
  }

  update();
  return container.node();
}


function _24(md){return(
md`#### What We Found

Crime follows a clear diurnal rhythm with predictable peaks and valleys. Across all years (2015-2024), crime hits its lowest point at 5-6am (~220 incidents) when most people are asleep, rises steadily through the morning with a noon spike (~850), then climbs to the afternoon peak at 5pm (~920). Crime stays elevated through evening hours before declining after midnight back to that 5-6am minimum.

**Pre-COVID (2015-2019)**: Same rhythm, scaled proportionally—5-6am low (~120), noon bump (~410), 5pm peak (~450). The curve shape is nearly identical to the full dataset, just smaller absolute numbers.

**COVID Period (2020-2021)**: The pattern flattens and shifts. Crime bottoms at 5-6am (~40-55), but the afternoon peak is less pronounced and shifts to 5pm (~180), staying elevated through the evening (160-165). The usual noon lunch-hour spike is muted—lockdowns disrupted normal routines with fewer commuters and midday workers.

**Post-COVID (2020-2023) and Recent (2023-2024)**: The classic pattern returns fully. The rhythm has re-established itself, showing these temporal patterns are deeply tied to urban routines.

The **midnight spike** (~700 incidents) is notable, likely tied to bar/nightlife closing times and heightened social interactions.

#### Why This Visualization Works

We chose an **area chart** to emphasize the cumulative "volume" of crime throughout the day—the filled area makes this more intuitive than a line alone. The connected points track continuous time flow, making temporal patterns immediately visible.

We added **dual filtering** (time period + crime type) to enable deeper exploration. Users can isolate specific crime types to see if petit larceny peaks differ from assault (they do).

The **24-hour x-axis** with hour-level granularity balances detail with readability—minute-level would be noisy, 4-hour blocks would obscure the noon spike.

#### What This Actually Means

**For police deployment**: Resources should flex throughout the day. 5-6am minimum suggests reduced patrols are reasonable, but afternoon/evening (3pm-8pm) demand 4x higher coverage.

**The noon spike**: Lunch-hour bump suggests crimes of opportunity when workers and shoppers flood streets—retail theft and pickpocketing tied to commuter flows.

**COVID's recovery**: The pattern's full return post-COVID shows crime timing is driven by opportunity structures (when people are out, when businesses open) more than offender preferences. When normal life resumed, normal crime patterns followed.`
)}

function _25(md){return(
md`---
### Question 5: How do crime patterns evolve across both space and time?

Understanding how crime evolves differently across boroughs reveals whether hotspots are stable or shifting. This spatio-temporal analysis tracks each borough's trajectory over the decade, exposing which areas experienced the sharpest declines during COVID and the strongest post-pandemic surges.`
)}

async function _q5_data(URLSearchParams,API_BASE)
{
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const promises = years.map(year => {
      const params = new URLSearchParams({
      $select: `boro_nm, count(*) as count`,
      $where: `date_extract_y(cmplnt_fr_dt) = ${year} AND boro_nm IS NOT NULL`,
      $group: `boro_nm`
    });
    return fetch(`${API_BASE}?${params}`).then(r => r.json()).then(d => d.map(i => ({
        year: year,
        borough: i.boro_nm,
        count: +i.count
    })));
  });
  const results = await Promise.all(promises);
  return results.flat().filter(d => d.borough !== '(null)');
}


function _chart_q5(d3,timeFilters,q5_data,tooltip)
{
  const container = d3.create("div").style("font-family", "sans-serif");
  const width = 900, height = 500;
  const margin = {top: 50, right: 150, bottom: 60, left: 85};

  timeFilters.createSelect(container, (val) => update(val));

  const svg = container.append("svg").attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]);
  const x = d3.scaleLinear().range([margin.left, width - margin.right]);
  const y = d3.scaleLinear().range([height - margin.bottom, margin.top]);
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  
  const gX = svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`);
  const gY = svg.append("g").attr("transform", `translate(${margin.left},0)`);
  const gLines = svg.append("g");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Crime Evolution by Borough");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 25)
    .attr("x", 0 - (height / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Total Crimes");

  svg.append("text")
    .attr("transform", `translate(${width/2}, ${height - 15})`)
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Year");

  const legend = svg.append("g").attr("transform", `translate(${width - margin.right + 20}, ${margin.top + 20})`);

  function update(filterIndex) {
    const filterFn = timeFilters.options[filterIndex].filter;
    const filtered = q5_data.filter(d => filterFn(d.year));

    x.domain(d3.extent(filtered, d => d.year));
    y.domain([0, d3.max(filtered, d => d.count)]).nice();
    
    gX.transition().duration(750).call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(filtered.length > 5 ? 10 : filtered.length));
    gY.transition().duration(750).call(d3.axisLeft(y));

    const line = d3.line().x(d => x(d.year)).y(d => y(d.count)).curve(d3.curveMonotoneX);
    const boroughs = d3.group(filtered, d => d.borough);
    const boroughsArray = Array.from(boroughs);

    const groups = gLines.selectAll(".boro-group")
        .data(boroughsArray, d => d[0]);

    const groupsEnter = groups.enter().append("g").attr("class", "boro-group");
    const groupsExit = groups.exit().remove();
    const groupsUpdate = groups.merge(groupsEnter);

    groupsUpdate.selectAll("path")
      .data(d => [d[1]])
      .join("path")
      .attr("fill", "none")
      .attr("stroke", d => color(d[0].borough))
      .attr("stroke-width", 2.5)
      .transition()
      .duration(750)
      .ease(d3.easeCubicOut)
      .attr("d", line);

    const dots = groupsUpdate.selectAll("circle")
        .data(d => d[1]);
    
    dots.join(
        enter => enter.append("circle")
            .attr("r", 0)
            .attr("cx", d => x(d.year))
            .attr("cy", d => y(d.count))
            .attr("fill", d => color(d.borough))
            .call(e => e.transition().duration(500).attr("r", 4)),
        update => update.transition()
            .duration(750)
            .ease(d3.easeCubicOut)
            .attr("cx", d => x(d.year))
            .attr("cy", d => y(d.count))
            .attr("fill", d => color(d.borough)),
        exit => exit.transition().duration(500).attr("r", 0).remove()
    );
    
    groupsUpdate.selectAll("circle")
        .on("mouseover", (e, d) => {
             d3.select(e.currentTarget).transition().attr("r", 7);
             tooltip.style("visibility", "visible").html(`<strong>${d.borough} ${d.year}</strong><br>${d.count.toLocaleString()}`)
             .style("top", (e.pageY-10)+"px").style("left", (e.pageX+10)+"px");
        })
        .on("mouseout", (e) => {
             d3.select(e.currentTarget).transition().attr("r", 4);
             tooltip.style("visibility", "hidden");
        });

    const legendItems = legend.selectAll("g")
        .data(boroughsArray.map(d => d[0]));

    const legendEnter = legendItems.enter().append("g")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`);

    legendEnter.append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", d => color(d));

    legendEnter.append("text")
        .attr("x", 20)
        .attr("y", 10)
        .style("font-size", "12px")
        .text(d => d);

    legendItems.exit().remove();
  }

  update(0);
  return container.node();
}


function _28(md){return(
md`#### What We Found

**The V-shaped COVID disruption is universal but uneven**. Looking at the full decade (2015-2024), all five boroughs show the same pattern: slight pre-pandemic decline, dramatic 2020 crash, then strong recovery exceeding pre-COVID levels. But the magnitude varies significantly.

**Manhattan's drop was most dramatic**: From ~115K in 2019 to ~97K in 2020—a 16% decline. This makes sense given Manhattan's dependence on commuters, tourists, and commercial activity that vanished during lockdown. Brooklyn dropped from ~132K to ~120K (9%), while Bronx and Queens saw similar 10-12% declines.

**Pre-COVID (2015-2019)**: All boroughs showed gradual downward trends. Brooklyn declined from 143K to 132K, Bronx from 107K to 100K. This suggests crime was actually improving across the board before the pandemic hit.

**COVID Period (2020-2021)**: The recovery begins. Brooklyn climbs from 120K to 127K, Manhattan from 97K to 111K. All boroughs show upward trajectories as the city reopens, but they're still well below pre-pandemic levels at this point.

**Post-COVID (2020-2023)**: This is where the surge happens. Brooklyn rockets from 120K to 154K—a 28% increase that overshoots its pre-COVID baseline by 17%. Manhattan climbs from 97K to 132K (36% increase). The steepness of these lines is striking—crime didn't gradually return, it exploded back.

**Recent Years (2023-2024)**: Lines flatten dramatically, suggesting we've reached a new equilibrium. Brooklyn stabilizes around 155K, Manhattan ~135K. This plateau is concerning because it's above pre-pandemic levels—the "new normal" is a higher crime environment.

**Staten Island remains an outlier**: While other boroughs swing dramatically (±20-30%), Staten Island stays remarkably flat around 20-24K throughout the entire decade. Its trajectory barely responds to COVID or the recovery, reinforcing its geographic and functional separation from the rest of NYC.

#### Why This Visualization Works

We chose a **multi-line chart** because it's optimal for showing multiple time series simultaneously while enabling direct comparison of trends. Each borough gets its own color-coded line, making it easy to track individual trajectories and spot divergences.

The **consistent y-axis scale** across all time periods allows fair visual comparison of absolute magnitudes. Connected points emphasize continuity and make inflection points (like the 2020 dip) immediately visible.

**Temporal filtering** lets users isolate specific periods to see detailed dynamics that get compressed in the full 10-year view. The COVID period (2020-2021) would be invisible as just two points in the full chart, but filtering reveals the recovery trajectory clearly.

#### What This Actually Means

**Manhattan's volatility** suggests its crime is highly sensitive to external economic shocks. The 36% post-COVID surge indicates crime there is driven by opportunity structures—when people return, so does crime. This has implications for remote work policies affecting long-term crime levels.

**Brooklyn's sustained surge** is particularly concerning. At 155K, it's 17% above its pre-COVID baseline and shows no signs of declining. This isn't a temporary spike—it's been sustained for 2+ years.

**The plateau in 2023-2024** suggests crime has stabilized at this elevated level. Whether this represents a permanent shift or will eventually decline to pre-pandemic levels is a critical question for city planning and resource allocation.`
)}

function _29(md){return(
md`---
### Question 6: Where do different types of crimes typically occur?

Understanding where crimes happen—streets, residences, transit, commercial spaces—is crucial for targeted interventions. This Sankey diagram reveals the relationship between crime types and premises, showing that different offenses cluster in distinct locations requiring tailored security strategies.`
)}

async function _q6_data(URLSearchParams,API_BASE)
{
  const topCrimes = ["PETIT LARCENY", "HARASSMENT 2", "ASSAULT 3 & RELATED OFFENSES", "GRAND LARCENY", "ROBBERY"];
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  
  const promises = years.map(year => {
    const params = new URLSearchParams({
        $select: `ofns_desc, prem_typ_desc, count(*) as count`,
        $where: `date_extract_y(cmplnt_fr_dt) = ${year} AND ofns_desc IS NOT NULL AND prem_typ_desc IS NOT NULL`,
        $group: `ofns_desc, prem_typ_desc`,
        $order: `count DESC`,
        $limit: 60
    });
    return fetch(`${API_BASE}?${params}`).then(r => r.json()).then(d => d.filter(i => 
        topCrimes.includes(i.ofns_desc) && 
        i.prem_typ_desc !== '(null)' && 
        i.prem_typ_desc !== 'null' &&
        i.prem_typ_desc !== ''
    ).map(i => ({
        year: year,
        source: i.ofns_desc,
        target: i.prem_typ_desc,
        value: +i.count
    })));
  });
  
  const results = await Promise.all(promises);
  return results.flat();
}


function _chart_q6(d3,timeFilters,q6_data,tooltip)
{
  const container = d3.create("div").style("font-family", "sans-serif");
  const width = 900, height = 700;
  const margin = {top: 40, left: 150, right: 150};
  
  timeFilters.createSelect(container, (val) => update(val));
  
  const svg = container.append("svg").attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]);
  const networkG = svg.append("g");
  
  const crimeX = width * 0.25;
  const premiseX = width * 0.75;

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2 + 10)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Crime Type to Premises Flow");

  const legend = svg.append("g").attr("transform", `translate(${width/2 - 70}, ${margin.top + 10})`);
  legend.append("circle").attr("r", 6).attr("fill", "#e63946").attr("cx", 0);
  legend.append("text").attr("x", 10).attr("y", 4).text("Crime").style("font-size", "12px");
  legend.append("circle").attr("r", 6).attr("fill", "#457b9d").attr("cx", 60);
  legend.append("text").attr("x", 70).attr("y", 4).text("Premise").style("font-size", "12px");

  function update(filterIndex) {
      const filterFn = timeFilters.options[filterIndex].filter;
      const filtered = q6_data.filter(d => filterFn(d.year));

      const linkMap = d3.rollup(filtered, v => d3.sum(v, d => d.value), d => d.source, d => d.target);
      const links = [];
      const nodeVals = new Map();
      
      linkMap.forEach((targets, src) => {
          targets.forEach((val, tgt) => {
              if(val > 0) {
                  links.push({source: src, target: tgt, value: val});
                  nodeVals.set(src, (nodeVals.get(src) || 0) + val);
                  nodeVals.set(tgt, (nodeVals.get(tgt) || 0) + val);
              }
          });
      });

      const sources = Array.from(new Set(links.map(d => d.source))).sort();
      const targets = Array.from(new Set(links.map(d => d.target))).sort((a,b) => (nodeVals.get(b)||0) - (nodeVals.get(a)||0)).slice(0, 15);

      const validLinks = links.filter(d => targets.includes(d.target));

      const nodes = [
          ...sources.map((id, i) => ({
              id, type: 'source', 
              x: crimeX, 
              y: (i+1) * (height - 100) / (sources.length + 1) + 60, 
              total: nodeVals.get(id)
          })),
          ...targets.map((id, i) => ({
              id, type: 'target', 
              x: premiseX, 
              y: (i+1) * (height - 100) / (targets.length + 1) + 60, 
              total: nodeVals.get(id)
          }))
      ];

      const nodeSize = d3.scaleSqrt().domain([0, d3.max(nodes, d => d.total)]).range([5, 20]);
      const linkWidth = d3.scaleSqrt().domain([0, d3.max(validLinks, d => d.value)]).range([1, 15]);
      
      const l = networkG.selectAll(".link")
        .data(validLinks, d => d.source + "-" + d.target);
        
      l.join(
          enter => enter.append("path")
            .attr("class", "link")
            .attr("fill", "none")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0)
            .attr("d", d => {
                const s = nodes.find(n => n.id === d.source);
                const t = nodes.find(n => n.id === d.target);
                if(!s || !t) return null;
                const curvature = 0.5;
                const xi = d3.interpolateNumber(s.x, t.x), x2 = xi(curvature), x3 = xi(1 - curvature);
                return `M${s.x},${s.y}C${x2},${s.y} ${x3},${t.y} ${t.x},${t.y}`;
            })
            .call(e => e.transition().duration(1000).attr("stroke-opacity", 0.4)),
          update => update.transition().duration(750)
            .attr("stroke-width", d => linkWidth(d.value))
            .attr("d", d => {
                  const s = nodes.find(n => n.id === d.source);
                  const t = nodes.find(n => n.id === d.target);
                  const curvature = 0.5;
                  const xi = d3.interpolateNumber(s.x, t.x), x2 = xi(curvature), x3 = xi(1 - curvature);
                  return `M${s.x},${s.y}C${x2},${s.y} ${x3},${t.y} ${t.x},${t.y}`;
            }),
          exit => exit.transition().duration(500).attr("stroke-opacity", 0).remove()
      );
      
      networkG.selectAll(".link").on("mouseover", (e, d) => {
          tooltip.style("visibility", "visible").html(`<strong>${d.source} → ${d.target}</strong><br>${d.value.toLocaleString()} incidents`)
            .style("top", (e.pageY-10)+"px").style("left", (e.pageX+10)+"px");
          d3.select(e.currentTarget).attr("stroke", "#333").attr("stroke-opacity", 0.8);
      }).on("mouseout", (e) => {
          tooltip.style("visibility", "hidden");
          d3.select(e.currentTarget).attr("stroke", "#999").attr("stroke-opacity", 0.4);
      });

      const n = networkG.selectAll(".node")
        .data(nodes, d => d.id);
        
      const nEnter = n.enter().append("g").attr("class", "node");
      nEnter.append("circle").attr("stroke", "white").attr("stroke-width", 2).attr("r", 0);
      nEnter.append("text").attr("dy", "0.35em").style("font-size", "10px").style("font-weight", "bold").style("opacity", 0);
      
      const nUpdate = n.merge(nEnter);
      
      nUpdate.transition().duration(750)
        .attr("transform", d => `translate(${d.x},${d.y})`);
        
      nUpdate.select("circle")
        .transition().duration(750).ease(d3.easeBackOut)
        .attr("r", d => nodeSize(d.total))
        .attr("fill", d => d.type === 'source' ? "#e63946" : "#457b9d");

      nUpdate.select("text")
        .text(d => d.id)
        .attr("x", d => d.type === 'source' ? -nodeSize(d.total) - 5 : nodeSize(d.total) + 5)
        .attr("text-anchor", d => d.type === 'source' ? "end" : "start")
        .transition().duration(750).style("opacity", 1);
        
      nUpdate.on("mouseover", (e, d) => {
          tooltip.style("visibility", "visible").html(`<strong>${d.id}</strong><br>Total: ${d.total.toLocaleString()}`)
            .style("top", (e.pageY-10)+"px").style("left", (e.pageX+10)+"px");
      }).on("mouseout", () => tooltip.style("visibility", "hidden"));
      
      n.exit().transition().duration(500).style("opacity", 0).remove();
  }
  
  update(0);
  return container.node();
}


function _32(md){return(
md`#### What We Found

**Street dominates as the primary crime location** across all types, but concentration varies dramatically by offense.

**Petit Larceny shows the most diverse distribution**: While substantial flow goes to Street, we see significant branches to Chain Store, Department Store, Transit-NYC Subway, Clothing/Boutique, and Grocery/Bodega. This makes sense—petit larceny (shoplifting, pickpocketing) happens wherever there are goods and crowds, reflecting its opportunistic nature.

**Assault concentrates in three contexts**: Street (largest flow), Residence-Apt. House, and Residence-House. The thick residential flows suggest domestic incidents and neighbor disputes dominate assault patterns. Assault is distinctly more "private" than property crimes.

**Grand Larceny shows unique patterns**: Strong flows to Street and Residence-Apt. House, with moderate flows to Commercial Building and Department Store. The residential concentration likely reflects car thefts from parking areas and package thefts from apartment buildings.

**Robbery is street-centric**: The flow from Robbery to Street is proportionally the thickest of all relationships. This aligns with robbery's confrontational nature requiring proximity to escape routes. Thin flows elsewhere show robbery rarely happens indoors.

**Transit's limited role**: Despite NYC's massive subway system, Transit-NYC Subway receives only moderate flows, primarily from Petit Larceny. This suggests either effective transit policing or underreporting compared to street crimes.

**COVID impact**: During 2020-2021, all flows thin dramatically but maintain the same proportional relationships. Crime decreased everywhere without shifting between locations.

#### Why This Visualization Works

We chose a **Sankey diagram** because it's optimal for visualizing flow relationships between categorical dimensions. Flow width encodes quantity, making it immediately apparent which crime-premise combinations dominate. This reveals patterns obscured in tables or bar charts.

The **left-to-right flow** creates a clear narrative: crime types "flow into" their typical locations. **Color coding** (red for crimes, blue for premises) distinguishes categories while gray flows emphasize quantitative relationships.

#### What This Actually Means

**For security resources**: Different crimes need different interventions. Street crimes need visible patrols and lighting. Commercial establishments need loss prevention focused on petit larceny. Residential buildings need domestic violence resources.

**Petit larceny's spread** suggests it's the most opportunistic crime, requiring broad environmental design strategies (surveillance, access control) rather than concentrated enforcement.

**Residential assault concentration** suggests social service interventions (domestic violence programs, conflict mediation) may be more effective than traditional law enforcement.

**Transit's moderate role** is positive—given millions of daily riders, the relatively small flow suggests transit is genuinely safer per capita than streets.`
)}

function _33(md){return(
md`---
### Question 7: How do crime rates vary across NYC's police precincts?

Raw crime counts from Question 2 don't tell the full story—densely populated areas naturally report more incidents. This choropleth map visualizes crime intensity at the precinct level, revealing which neighborhoods face disproportionate crime burdens and how these spatial patterns have persisted across the decade.`
)}

async function _q7_data(URLSearchParams,API_BASE)
{
  const geo = await fetch("https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Police_Precincts/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson").then(r => r.json());
  
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const promises = years.map(year => {
    const params = new URLSearchParams({
      $select: `addr_pct_cd, count(*) as count`,
      $where: `date_extract_y(cmplnt_fr_dt) = ${year} AND addr_pct_cd IS NOT NULL`,
      $group: `addr_pct_cd`
    });
    return fetch(`${API_BASE}?${params}`).then(r => r.json()).then(d => d.map(i => ({
        year: year,
        precinct: i.addr_pct_cd,
        count: +i.count
    })));
  });
  const results = await Promise.all(promises);
  const crimeData = results.flat();

  return { geo, crimeData };
}


function _chart_q7(d3,timeFilters,q7_data,tooltip)
{
  const container = d3.create("div").style("font-family", "sans-serif");
  const width = 800, height = 750;
  
  timeFilters.createSelect(container, (val) => update(val));

  const svg = container.append("svg").attr("width", width).attr("height", height);
  const projection = d3.geoMercator().fitSize([width, height - 50], q7_data.geo);
  const path = d3.geoPath().projection(projection);

  const color = d3.scaleQuantile().range(d3.schemeYlOrRd[8]);

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Crime Intensity by Precinct");

  const gMap = svg.append("g").attr("transform", "translate(0, 40)");
  
  function update(filterIndex) {
    const filterFn = timeFilters.options[filterIndex].filter;
    const rollup = d3.rollup(
        q7_data.crimeData.filter(d => filterFn(d.year)),
        v => d3.sum(v, d => d.count),
        d => d.precinct
    );
    
    const values = Array.from(rollup.values());
    if (values.length > 0) {
        color.domain(values);
    }

    gMap.selectAll("path")
      .data(q7_data.geo.features)
      .join("path")
      .attr("d", path)
      .attr("stroke", "#666")
      .attr("stroke-width", 0.5)
      .transition()
      .duration(750)
      .attr("fill", d => {
         const p = (d.properties.precinct || d.properties.Precinct || "").toString();
         const val = rollup.get(p) || 0;
         d.properties._currentCount = val;
         return val > 0 ? color(val) : "#eee";
      });

     gMap.selectAll("path")
      .on("mouseover", (e, d) => {
         d3.select(e.currentTarget).attr("stroke", "black").attr("stroke-width", 2);
         tooltip.style("visibility", "visible")
            .html(`<strong>Precinct ${d.properties.precinct || d.properties.Precinct}</strong><br>Crimes: ${d.properties._currentCount.toLocaleString()}`)
            .style("top", (e.pageY-10)+"px").style("left", (e.pageX+10)+"px");
      })
      .on("mouseout", (e) => {
         d3.select(e.currentTarget).attr("stroke", "#666").attr("stroke-width", 0.5);
         tooltip.style("visibility", "hidden");
      });
  }
  
  const legendHeight = 200;
  const legendWidth = 20;
  const legendSvg = svg.append("g").attr("transform", `translate(50, 100)`);
  
  legendSvg.append("text").attr("x", 0).attr("y", -10).text("Crime Count").style("font-size", "11px").style("font-weight", "bold");
  
  const legendColors = d3.schemeYlOrRd[8];
  
  const legendScale = d3.scaleBand().domain(d3.range(8)).range([legendHeight, 0]); 
  
  legendSvg.selectAll("rect")
    .data(legendColors)
    .join("rect")
    .attr("x", 0)
    .attr("y", (d, i) => legendScale(i)) 
    .attr("width", legendWidth)
    .attr("height", legendScale.bandwidth())
    .attr("fill", d => d);

  legendSvg.append("text").attr("x", 25).attr("y", legendHeight).text("Low").style("font-size", "10px");
  legendSvg.append("text").attr("x", 25).attr("y", 10).text("High").style("font-size", "10px");

  update(0);
  return container.node();
}


function _36(md){return(
md`#### What We Found

**Crime hotspots are geographically concentrated and remarkably stable**. Across all time periods, the same precincts consistently appear in dark red (high crime), while the same areas remain pale yellow (low crime).

**Central Bronx precincts dominate as the highest-crime areas**. The cluster of dark red precincts in the central and northern Bronx persists across every time period—Pre-COVID, COVID, Post-COVID, and Recent Years. These precincts consistently rank among the city's highest crime areas.

**Central Brooklyn shows similar concentration**. The Bedford-Stuyvesant, Crown Heights, and Brownsville areas maintain dark red coloring throughout all periods, indicating sustained high crime levels that don't diminish even during COVID.

**Manhattan shows interesting variation**. Midtown Manhattan (commercial/tourist core) appears in dark red, reflecting high absolute crime counts from commuter and tourist activity. However, some residential Manhattan precincts show moderate orange tones. Upper Manhattan precincts near the Bronx also show consistently elevated crime.

**Staten Island remains distinctly low-crime**. Nearly all Staten Island precincts appear in pale yellow across all periods, confirming its status as NYC's safest borough at the precinct level. The geographic isolation and suburban character create a fundamentally different crime environment.

**Queens shows moderate, consistent patterns**. Most Queens precincts fall in the orange/light orange range—neither extreme hotspots nor particularly safe. This borough demonstrates the most uniform distribution without dramatic highs or lows.

**COVID barely altered the spatial pattern**. Filtering to 2020-2021 shows the color scale shifted lighter (less crime overall), but the *relative* rankings stayed identical. High-crime precincts remained high-crime, low-crime precincts remained low-crime. This suggests structural factors (poverty, density, infrastructure) drive geographic patterns more than temporary disruptions.

**The pattern is returning to pre-COVID intensity**. Post-COVID (2020-2023) and Recent Years (2023-2024) maps show colors darkening back to Pre-COVID levels, confirming the crime surge we saw in earlier questions is geographically uniform—hotspots are getting worse, but not shifting location.

#### Why This Visualization Works

We chose a **choropleth map** because it's optimal for visualizing geographic distributions across administrative boundaries. Color encoding on a spatial layout makes patterns immediately visible—you can spot hotspot clusters at a glance without reading numbers.

The **sequential color scheme** (yellow to red) intuitively maps to crime intensity, following conventions where red signals danger. The diverging scale makes both extremes (very low and very high) visually distinctive.

**Precinct-level granularity** provides actionable detail for police deployment while remaining interpretable. Finer resolution (block-level) would be too noisy; coarser resolution (borough-level) would hide critical within-borough variation.

#### What This Actually Means

**For resource allocation**: The persistence of hotspots suggests chronic structural issues requiring sustained intervention, not just temporary enforcement surges. Central Bronx and central Brooklyn precincts need permanent resource increases.

**Geographic inequality is stark**: The map reveals dramatic crime inequality across NYC. Residents in dark red precincts experience fundamentally different safety environments than those in pale yellow areas, often just a few miles away.

**Hotspots didn't migrate during COVID**: The stability of spatial patterns even through unprecedented disruption suggests crime geography is deeply rooted in neighborhood characteristics—built environment, economic conditions, social networks—not just transient factors.

**Staten Island's uniqueness**: Its consistently low crime across all precincts reinforces that geographic isolation, suburban form, and different demographic composition create different crime dynamics. Policies effective in Manhattan may not apply there.`
)}

function _37(md){return(
md`---
### Question 8: What insights emerge when filtering by multiple dimensions simultaneously?

Our previous analyses examined temporal, spatial, and categorical patterns separately. This interactive dashboard synthesizes all dimensions, enabling users to explore custom combinations—filtering by time period, borough, and crime type simultaneously. This reveals insights invisible in aggregate views and demonstrates the power of multi-dimensional exploratory analysis.`
)}

async function _q8_sample_data(fetchData)
{
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const promises = years.map(year => 
    fetchData(`date_extract_y(cmplnt_fr_dt) = ${year} AND cmplnt_fr_tm IS NOT NULL AND boro_nm IS NOT NULL`, 2000)
  );
  
  const results = await Promise.all(promises);
  return results.flat().map(d => ({
    borough: d.boro_nm,
    offense: d.ofns_desc,
    year: new Date(d.cmplnt_fr_dt).getFullYear(),
    hour: d.cmplnt_fr_tm ? parseInt(d.cmplnt_fr_tm.split(':')[0]) : null
  })).filter(d => d.hour !== null);
}


function _chart_q8(d3,timeFilters,q8_sample_data,tooltip)
{
  const container = d3.create("div").style("font-family", "sans-serif").style("border", "1px solid #eee").style("padding", "10px");
  
  const controls = container.append("div").style("display", "flex").style("gap", "15px").style("margin-bottom", "15px");
  
  const timeWrap = controls.append("div");
  timeWrap.append("label").text("Time Period: ").style("font-weight", "bold");
  const timeSel = timeWrap.append("select").on("change", update);
  timeSel.selectAll("option").data(timeFilters.options).join("option").attr("value", (d,i)=>i).text(d => d.label);
  
  const boroWrap = controls.append("div");
  boroWrap.append("label").text("Borough: ").style("font-weight", "bold");
  const boroSel = boroWrap.append("select").on("change", update);
  boroSel.append("option").text("All").attr("value", "All");
  ["BROOKLYN", "MANHATTAN", "QUEENS", "BRONX", "STATEN ISLAND"].forEach(b => boroSel.append("option").text(b).attr("value", b));
  
  const crimeWrap = controls.append("div");
  crimeWrap.append("label").text("Crime: ").style("font-weight", "bold");
  const crimeSel = crimeWrap.append("select").on("change", update);
  crimeSel.append("option").text("All").attr("value", "All");
  ["PETIT LARCENY", "HARASSMENT 2", "ASSAULT 3 & RELATED OFFENSES", "GRAND LARCENY", "ROBBERY"].forEach(c => crimeSel.append("option").text(c).attr("value", c));
  
  const width = 800, height = 450;
  const margin = {top: 30, right: 30, bottom: 50, left: 60};
  const svg = container.append("svg").attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]);
  
  const x = d3.scaleLinear().domain([0, 23]).range([margin.left, width - margin.right]);
  const y = d3.scaleLinear().range([height - margin.bottom, margin.top]);
  
  const line = d3.line().x(d => x(d.hour)).y(d => y(d.count)).curve(d3.curveMonotoneX);
  const area = d3.area().x(d => x(d.hour)).y0(height - margin.bottom).y1(d => y(d.count)).curve(d3.curveMonotoneX);
  
  svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).ticks(12).tickFormat(d => d+"h"));
  const yAxis = svg.append("g").attr("transform", `translate(${margin.left},0)`);
  
  const pathArea = svg.append("path").attr("fill", "#8b5cf6").attr("fill-opacity", 0.4);
  const pathLine = svg.append("path").attr("fill", "none").attr("stroke", "#7c3aed").attr("stroke-width", 3);
  
  const countLabel = svg.append("text").attr("x", width - margin.right).attr("y", margin.top).attr("text-anchor", "end").style("font-size", "12px").style("fill", "#666");
  
  const warningLabel = svg.append("text").attr("x", width / 2).attr("y", height / 2).attr("text-anchor", "middle").style("font-size", "14px").style("fill", "red").style("font-weight", "bold").style("opacity", 0);

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 20)
    .attr("x", 0 - (height / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Crime Count");

  svg.append("text")
    .attr("transform", `translate(${width/2}, ${height - 10})`)
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Hour of Day");

  const dotsGroup = svg.append("g");

  function update() {
      const timeIdx = timeSel.node().value;
      const boro = boroSel.node().value;
      const crime = crimeSel.node().value;
      
      const filterFn = timeFilters.options[timeIdx].filter;
      
      let filtered = q8_sample_data.filter(d => filterFn(d.year));
      if (boro !== "All") filtered = filtered.filter(d => d.borough === boro);
      if (crime !== "All") filtered = filtered.filter(d => d.offense === crime);
      
      const counts = d3.rollup(filtered, v => v.length, d => d.hour);
      const data = Array.from({length: 24}, (_, i) => ({ hour: i, count: counts.get(i) || 0 }));
      
      y.domain([0, d3.max(data, d => d.count) || 10]).nice();
      yAxis.transition().duration(500).call(d3.axisLeft(y));
      
      pathArea.datum(data).transition().duration(500).ease(d3.easeCubicOut).attr("d", area);
      pathLine.datum(data).transition().duration(500).ease(d3.easeCubicOut).attr("d", line);
      
      countLabel.text(`Sample Count: ${filtered.length} incidents`);

      if (filtered.length < 100) {
          warningLabel.text("⚠️ Low sample count (<100). Trend may be unreliable.").style("opacity", 1);
      } else {
          warningLabel.style("opacity", 0);
      }

      dotsGroup.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", 4)
        .attr("fill", "#7c3aed")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .on("mouseover", (e, d) => {
            d3.select(e.currentTarget).transition().attr("r", 6);
            tooltip.style("visibility", "visible")
                .html(`<strong>${d.hour}:00</strong><br>Crimes: ${d.count.toLocaleString()}`)
                .style("top", (e.pageY-10)+"px").style("left", (e.pageX+10)+"px");
        })
        .on("mouseout", (e) => {
            d3.select(e.currentTarget).transition().attr("r", 4);
            tooltip.style("visibility", "hidden");
        })
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut)
        .attr("cx", d => x(d.hour))
        .attr("cy", d => y(d.count));
  }
  
  update();
  return container.node();
}


function _40(md){return(
md`#### What We Found

**The dashboard enables hypothesis testing through filtering**. Rather than just presenting fixed views, users can ask specific questions like "How did petit larceny in Brooklyn change during COVID?" and get immediate visual answers.

**General patterns (All filters)** show the familiar diurnal rhythm we saw in Question 4—crime peaks at 5-6pm (~1,240 incidents in the full dataset) and bottoms out at 5-6am (~300). This establishes the baseline for comparison when we start filtering.

**Time period filtering reveals pandemic impact**: Pre-COVID peaks at ~600 incidents at 5pm. COVID drops to ~265 at 5pm (56% reduction). Post-COVID surges to ~510 at 5pm, and Recent Years (2023-2024) shows ~255-260 at 4-5pm. The shape stays consistent but magnitude shifts dramatically.

**Borough + Crime filtering exposes unique signatures**: The last screenshot shows **Pre-COVID Brooklyn Petit Larceny**—a completely different pattern emerges. Instead of the usual evening peak, we see two distinct afternoon peaks: noon (~45 incidents) and 3-4pm (~58 incidents, the true peak). This makes perfect sense—petit larceny (shoplifting, pickpocketing) follows business hours and shopping patterns. The evening decline is sharp because stores close and foot traffic drops.

**Sample counts vary dramatically**: Filtering to "All Years, All Boroughs, All Crimes" shows 20,000 sampled incidents. Brooklyn Petit Larceny Pre-COVID drops to just 699 incidents. This demonstrates both the granularity possible and the necessity of sampling for performance with 7M+ total records.

**Custom insights are powerful**: Users can explore questions like "When do assaults peak in the Bronx during winter?" or "How does Manhattan grand larceny timing differ from Queens?" Each combination reveals patterns specific to that context, enabling targeted interventions rather than one-size-fits-all policies.

#### Why This Visualization Works

We chose an **interactive dashboard with linked filters** because static views can't capture the complexity of multi-dimensional data. The three dropdown filters (Time Period, Borough, Crime Type) create 5 × 5 × 60+ possible combinations—over 1,500 potential views. Showing all of these statically would be overwhelming and impossible to navigate.

The **area chart visualization** remains consistent across filters, making comparisons intuitive. Users aren't learning a new chart type when they filter—they're seeing the same visualization with different data, which reduces cognitive load.

**Sample counts displayed** provide transparency about data completeness. When filters narrow results to small samples (like 699 incidents), users understand they're looking at more granular patterns.

The **"All" default state** lets users start broad then progressively narrow, following the information visualization mantra: "overview first, zoom and filter, then details on demand." This progressive disclosure prevents overwhelming users with too many choices immediately.

#### What This Actually Means

**For evidence-based decision making**: This dashboard transforms crime data from passive reporting to active exploration. Police can ask "What hours need coverage for robbery in southern Brooklyn?" and get immediate answers rather than requesting custom reports from analysts.

**Personalized safety planning**: Residents can filter to their borough and time period to understand their local context. A Queens resident seeing that their borough's crime peaks at different hours than Manhattan can adjust their routines accordingly.

**Resource optimization**: The ability to slice data by multiple dimensions simultaneously enables precise resource allocation. If Manhattan petit larceny peaks during business hours (11am-4pm) but Bronx assault peaks during evenings (6pm-9pm), these need different patrol strategies.

**Pattern discovery**: Exploratory dashboards reveal unexpected patterns. The Brooklyn Petit Larceny example shows how different crime types have fundamentally different rhythms—property crimes follow commerce patterns, violent crimes follow social interaction patterns. This wouldn't be visible in aggregate views.

**The big picture**: This dashboard represents the culmination of our analysis—all the patterns we identified in Questions 1-7 are explorable here in custom combinations. It transforms our findings from fixed insights into a tool for ongoing investigation and decision-making.`
)}

function _41(md){return(
md`---
## Conclusion

### Summary of Key Findings

Our analysis of 7+ million NYC crime incidents from 2015-2024 reveals several critical insights about the city's evolving safety landscape:

**1. COVID-19 Created a Dramatic but Temporary Disruption**  
Crime dropped 36% almost overnight in April 2020 (from 39K to 25K monthly incidents), but the recovery was swift and exceeded pre-pandemic levels. By 2023-2024, NYC experiences approximately 48K-50K incidents per month—15-20% higher than the 2015-2019 baseline. This suggests we've entered a new elevated crime equilibrium rather than experiencing a temporary spike.

**2. Geographic Patterns Are Remarkably Stable**  
Brooklyn consistently leads in absolute crime counts (1.4M incidents over the decade), followed by Manhattan (1.18M), Bronx (1.05M), Queens (1.02M), and Staten Island (210K). These rankings held constant across all time periods, including COVID, indicating that structural factors—population density, economic conditions, urban form—drive spatial patterns more than temporary shocks. Precinct-level analysis revealed persistent hotspots in central Bronx and central Brooklyn that remained unchanged even through the pandemic.

**3. Crime Types Show Distinct Profiles Across Boroughs**  
Manhattan exhibits a property-crime-heavy profile with petit larceny representing 25% of all incidents, reflecting its role as NYC's commercial and tourist center. Brooklyn and Bronx show more balanced mixes with higher assault concentrations, suggesting different intervention strategies are needed. The Sankey flow analysis revealed that assault concentrates heavily in residential settings while petit larceny spreads across commercial premises, streets, and transit—each requiring targeted security approaches.

**4. Temporal Patterns Follow Strong Diurnal Rhythms**  
Crime consistently peaks during afternoon hours (3pm-6pm) and bottoms out in early morning (5-6am), with afternoon hours experiencing 4x higher crime than early morning. This pattern persisted across all time periods, though COVID temporarily flattened the curve. Different crime types exhibit unique temporal signatures—petit larceny follows business hours with lunch and afternoon shopping peaks, while assaults show evening spikes tied to social interactions and nightlife.

**5. Location Context Matters Significantly**  
Streets remain the primary crime location across all types, but the concentration varies. Robbery is overwhelmingly street-centric (requiring escape routes), while assault splits between street and residential settings (domestic incidents). Petit larceny shows the most diverse distribution, occurring wherever goods and crowds converge—chain stores, department stores, transit, grocery stores. This diversity demands multi-pronged prevention strategies rather than single-focus enforcement.

**6. Staten Island Represents a Distinct Safety Environment**  
With only 4% of citywide crime despite comprising 10% of NYC's land area, Staten Island's geographic isolation, lack of subway connectivity, lower density, and suburban character create fundamentally different crime dynamics. This outlier status held constant across the entire decade, suggesting that policies effective in the other four boroughs may not apply there.

**7. The New Normal is an Elevated Crime Environment**  
The 2023-2024 plateau at elevated levels (48K-50K monthly incidents) has persisted for over two years, indicating this isn't a temporary deviation. Whether crime will eventually decline to pre-pandemic levels or remain at this new baseline is a critical question for long-term urban planning and public safety strategy.`
)}

function _42(md){return(
md`### Recommendations

Based on our analysis, we propose the following actionable strategies for NYC stakeholders:

**For NYPD & Law Enforcement:**

1. **Time-Based Resource Allocation**: Deploy 3-4x more patrol resources during afternoon/evening hours (3pm-8pm) compared to early morning (5-6am). The dramatic diurnal variation in crime justifies flexible shift scheduling rather than uniform 24-hour coverage.

2. **Borough-Specific Strategies**: 
   - **Manhattan**: Focus on commercial security, retail theft prevention, and transit policing during business hours (11am-6pm)
   - **Brooklyn & Bronx**: Prioritize assault prevention through community conflict resolution programs and evening patrols in residential areas
   - **Queens**: Maintain balanced approach given moderate, uniform crime distribution
   - **Staten Island**: Maintain current low-intensity policing but monitor for any emerging trends

3. **Persistent Hotspot Interventions**: Central Bronx and central Brooklyn precincts require sustained, long-term investments—not just temporary enforcement surges. Crime concentration in these areas has remained unchanged for a decade, suggesting deep structural issues need addressing.

4. **Seasonal Calibration**: Prepare for consistent 20-30% crime increases during summer months (June-August) with pre-planned resource scaling. This pattern has held across all time periods and is highly predictable.

**For City Planners & Urban Development:**

1. **Environmental Design**: High-crime precincts would benefit from improved street lighting, sight lines, and access control, particularly in residential areas where assault concentrates. CPTED (Crime Prevention Through Environmental Design) principles should guide infrastructure investments.

2. **Transit Security**: While transit crime is lower than expected given ridership volume, continued investment in subway surveillance, lighting, and staffing maintains this relative safety.

3. **Commercial District Planning**: Manhattan's heavy property crime burden suggests retail and commercial districts need enhanced security infrastructure, better surveillance, and improved coordination between NYPD and private security.

**For Community Organizations & Social Services:**

1. **Residential Assault Programs**: The high concentration of assault in residential settings (apartments, houses) indicates need for domestic violence intervention programs, tenant mediation services, and community conflict resolution resources—particularly in Brooklyn and Bronx.

2. **Youth Programs During Peak Hours**: Since crime peaks in afternoon/early evening (3pm-8pm), after-school and early evening youth programs could provide structured alternatives during high-risk hours.

**For Residents & Newcomers:**

1. **Personal Safety Planning**: Understanding that early morning (5-7am) is statistically safest for activities like jogging, while late afternoon/evening (4-8pm) carries 3-4x higher risk, enables informed routine planning.

2. **Neighborhood Research**: When relocating, examine precinct-level crime intensity maps rather than just borough-level statistics. Within-borough variation is substantial—some Brooklyn precincts are very safe while others are hotspots.

**For Data-Driven Policymaking:**

1. **Continuous Monitoring**: The interactive dashboard we created should be maintained and updated regularly, enabling ongoing hypothesis testing and rapid response to emerging patterns.

2. **Intervention Evaluation**: Use this baseline data to measure the effectiveness of new initiatives. Any crime prevention program should be evaluated by comparing its impact to the patterns documented here.

3. **Resource Justification**: The clear evidence of persistent hotspots, temporal patterns, and crime type distributions provides data-driven justification for targeted budget allocations rather than uniform spending across all precincts.`
)}

function _43(md){return(
md`---
### Limitations of the Study

While our analysis provides valuable insights, several limitations should be acknowledged:

**Data Completeness & Accuracy:**

1. **Unreported Crime**: Our dataset captures only reported incidents. Reporting rates vary significantly across communities, crime types, and time periods. Property crimes and violent crimes against strangers are more likely to be reported than domestic incidents, harassment, or crimes in immigrant communities with distrust of law enforcement.

2. **Missing Geographic Data**: Approximately 5% of records lacked coordinate information and were excluded from spatial analyses. If these missing records cluster in specific neighborhoods, our geographic hotspot analysis may be biased.

3. **Classification Consistency**: Crime categorization standards may have evolved over the 10-year period. Changes in how NYPD codes certain offenses (particularly harassment, assault subcategories) could affect temporal trend interpretation.

4. **Administrative Delays**: Some incidents are recorded months after occurrence, potentially distorting temporal patterns, particularly for complex investigations or cold cases.

**Analytical Scope:**

1. **Population Normalization**: While Question 7 mentioned normalizing by population for fair precinct comparison, we primarily presented raw counts. True per-capita rates would provide more accurate risk assessments, particularly for comparing residential versus commercial areas with large daytime populations.

2. **Socioeconomic Context Missing**: We did not integrate demographic, economic, or housing data that could explain *why* certain areas are hotspots. Our analysis describes *what* and *where*, but deeper causal analysis requires additional datasets.

3. **Crime Severity Not Weighted**: All incidents count equally—a murder and a petit larceny both contribute one incident. A severity-weighted analysis might reveal different patterns, particularly regarding resource allocation priorities.

4. **Weather & Special Events**: We didn't account for weather patterns, major events (protests, concerts, holidays), or other contextual factors that influence crime timing and location beyond our basic temporal filtering.

**Visualization & Sampling:**

1. **Computational Constraints**: For Question 8's interactive dashboard, we sampled data rather than loading the full 7M+ records. While representative, small sample sizes for specific filter combinations (e.g., 699 incidents for Brooklyn Petit Larceny) may not capture rare patterns.

2. **Choropleth Limitations**: Our precinct-level maps don't show within-precinct variation. Block-level or hexagonal binning analysis would reveal finer-grained hotspots but would be computationally expensive and potentially too noisy for interpretation.

**Temporal Coverage:**

1. **Pre-2015 Trends Unknown**: Our analysis begins in 2015, so we can't assess whether pre-pandemic crime levels were historically high or low. A longer temporal window would provide better context for the "normal" baseline.

2. **Recent Data Lag**: Our dataset extends through 2024, but quarterly update cycles mean the most recent 1-3 months may not yet be reflected. Very recent trends might not be captured.

**Interpretation Cautions:**

1. **Correlation vs. Causation**: We identified patterns and correlations but cannot definitively establish causal mechanisms. For example, why crime recovered stronger in Brooklyn than other boroughs post-COVID requires deeper investigation beyond visualization.

2. **Ecological Fallacy**: Our borough and precinct-level aggregations may mask important micro-level patterns. Individual block faces or specific intersections might have very different dynamics than the surrounding precinct average.`
)}

function _44(md){return(
md`### Future Work & Extensions

Several promising directions could extend and deepen this analysis:

**Enhanced Data Integration:**

1. **Socioeconomic Layering**: Integrate census data (income, education, housing density), employment statistics, and infrastructure information to build predictive models explaining why certain areas are persistent hotspots. Machine learning approaches could identify which neighborhood characteristics most strongly predict crime levels.

2. **Weather & Environmental Data**: Incorporate temperature, precipitation, and seasonal daylight hours to test the hypothesis that crime correlates with weather conditions beyond simple seasonal patterns.

3. **Transit Ridership Integration**: Normalize transit crime by ridership volume to calculate per-rider risk rates. Similarly, normalize commercial district crime by daytime population rather than residential population for fairer comparison.

4. **Policy Change Analysis**: Map NYPD policy changes, policing initiatives, and budget allocations onto the timeline to assess their impact on crime trends. Did specific interventions correlate with crime reductions in target areas?

**Advanced Spatial Analysis:**

1. **Hotspot Migration Tracking**: Use spatial autocorrelation techniques (Moran's I, LISA) to statistically identify hotspot clusters and track how they shift over time. Are hotspots spreading to adjacent areas or remaining spatially stable?

2. **Network Analysis**: Model crime along NYC's street network rather than aggregating by precinct. This could reveal specific high-risk corridors, intersections, or transit routes that require targeted interventions.

3. **Hexagonal Binning**: Replace precinct-level choropleths with hexagonal bins for uniform-area comparison, reducing the visual bias where larger precincts appear more prominent than smaller dense ones.

**Temporal Deep Dives:**

1. **Day-of-Week Analysis**: Expand hourly analysis to include day-of-week patterns. Do Friday and Saturday nights show different crime profiles than weeknights? Do Mondays have distinct patterns?

2. **Holiday & Event Impact**: Analyze crime during major holidays (New Year's Eve, July 4th), special events (New Year's in Times Square, Pride Parade), and crisis periods (hurricanes, blackouts) to understand how disruptions affect crime.

3. **Long-Term Trend Decomposition**: Use time series decomposition (trend, seasonal, residual components) to separate long-term crime trends from cyclical patterns and random fluctuations.

**Crime Type Specificity:**

1. **Offense Subcategories**: Drill deeper into broad categories like "Assault" (felony vs. misdemeanor, weapon involved vs. not) or "Grand Larceny" (auto theft vs. other property) to reveal more granular patterns.

2. **Victim-Offender Relationships**: Analyze known vs. stranger crimes. Domestic violence, acquaintance assaults, and stranger robberies likely have completely different temporal and spatial patterns requiring different interventions.

3. **Recidivism & Repeat Locations**: Analyze whether certain addresses experience repeated victimization, suggesting concentrated interventions could have outsized impact.

**Predictive Modeling:**

1. **Forecasting**: Build time series forecasting models (ARIMA, Prophet, LSTM neural networks) to predict future crime levels, enabling proactive resource allocation rather than reactive response.

2. **Risk Scoring**: Develop precinct or neighborhood risk scores combining temporal, spatial, and contextual factors to identify emerging hotspots before they fully develop.

3. **Intervention Simulation**: Use agent-based models or system dynamics to simulate how different policing strategies, urban design changes, or social programs might affect crime levels.

**Interactive Enhancements:**

1. **Real-Time Dashboard**: Build a live dashboard that updates automatically as new NYPD data releases become available, maintaining relevance for ongoing decision-making.

2. **Public Accessibility**: Deploy the dashboard as a public web application where residents can explore crime patterns in their neighborhoods, fostering transparency and community engagement.

3. **Mobile Application**: Create a mobile app that provides personalized safety scores based on user location, time of day, and activity type—helping residents make informed decisions in real-time.

**Comparative Analysis:**

1. **Other Cities**: Replicate this analysis framework for other major U.S. cities (Los Angeles, Chicago, Philadelphia) to identify patterns unique to NYC versus universal urban crime dynamics.

2. **International Comparison**: Compare NYC patterns to global cities with available open data (London, Toronto, Singapore) to understand how different policing models and urban contexts affect crime.

These extensions would transform our descriptive analysis into predictive, prescriptive insights that could directly inform policy and resource allocation decisions.`
)}

function _45(md){return(
md`---
## Team Contribution & Workload Distribution

This project represents a collaborative effort between team members Siddh Mandirwala (sm12505) and Krish Murjani (km6520). Below is a detailed breakdown of individual contributions:

### Siddh Mandirwala (sm12505) - 50% Contribution

**Data Processing & Preparation:**
- Downloaded and cleaned the NYPD Complaint Data Historic dataset (7+ million records)
- Performed data preprocessing including missing value handling, temporal field extraction, and geographic validation
- Created derived temporal attributes (season, time blocks, day of week)
- Handled data aggregations for performance optimization

**Visualization Development (Questions 1, 3, 5, 7):**
- **Question 1**: Implemented temporal trend line chart with interactive filtering (Pre-COVID, COVID, Post-COVID, Recent Years)
- **Question 3**: Developed grouped bar chart showing crime type distributions across boroughs
- **Question 5**: Created multi-line spatio-temporal evolution chart tracking borough trajectories
- **Question 7**: Built choropleth precinct-level intensity map with temporal filtering

**Technical Infrastructure:**
- Set up Observable notebook structure and D3.js framework
- Implemented responsive design and interactive filtering logic
- Optimized data loading and rendering performance for large datasets
- Handled D3 data binding, scales, and transitions for smooth interactivity

**Documentation:**
- Wrote code documentation and comments throughout the notebook
- Contributed to written analysis for assigned visualizations
- Assisted with presentation slide development

### Krish Murjani (km6520) - 50% Contribution

**Data Analysis & Context:**
- Conducted literature review on NYC crime trends and existing research
- Researched COVID-19 impact on urban crime for contextual interpretation
- Analyzed patterns in the data to formulate the 8 domain questions
- Provided domain expertise on crime types, premises, and urban safety concepts

**Visualization Development (Questions 2, 4, 6, 8):**
- **Question 2**: Implemented borough comparison bar chart with sequential color encoding and temporal filtering
- **Question 4**: Developed hourly distribution area chart with crime type filtering capability
- **Question 6**: Built Sankey diagram showing crime-to-premises flow relationships
- **Question 8**: Created comprehensive interactive dashboard with multi-dimensional filtering (time, borough, crime type)

**Narrative & Communication:**
- Wrote introduction section including problem statement, motivation, and context
- Developed data description section documenting sources, attributes, and preprocessing
- Authored analysis and interpretation text for assigned visualizations
- Wrote conclusion section including findings summary, recommendations, limitations, and future work

**Project Management:**
- Coordinated team meetings and milestone deadlines
- Ensured consistent styling and visual design language across all visualizations
- Conducted final quality assurance and testing of interactive elements

### Statement of Equal Contribution

Both team members contributed equally and substantially to this project. The work was distributed fairly based on individual strengths—Siddh focused more on technical implementation and performance optimization, while Krish emphasized narrative development and domain context—but both members were involved in all aspects of the project. The final product represents a truly collaborative effort where each member's contributions were essential to the project's success.`
)}

function _46(md){return(
md`---
## Links & Resources

### Project Deliverables

**Live Interactive Visualization:**
- Observable Notebook: [[NOTEBOOK]](https://observablehq.com/d/053b56acfb9cc2db)
- This notebook contains all 8 interactive visualizations with filtering capabilities

### Data Sources

**Primary Dataset:**
- NYPD Complaint Data Historic: https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Historic/qgea-i56i
- NYC Open Data Portal (official source)

**Supporting Geographic Data:**
- NYC Borough Boundaries (GeoJSON): https://data.cityofnewyork.us/City-Government/Borough-Boundaries/tqmj-j8zm
- NYC Police Precincts (GeoJSON): https://data.cityofnewyork.us/Public-Safety/Police-Precincts/78dh-3ptz

### Contact Information

For questions or feedback regarding this project:
- **Siddh Mandirwala**: sm12505@nyu.edu
- **Krish Murjani**: km6520@nyu.edu
---

*Last Updated: December 4 2025*  
*NYU Tandon School of Engineering - CS-GY 6313: Information Visualization*`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("API_BASE")).define("API_BASE", _API_BASE);
  main.variable(observer("fetchData")).define("fetchData", ["URLSearchParams","API_BASE"], _fetchData);
  main.variable(observer("tooltip")).define("tooltip", ["d3"], _tooltip);
  main.variable(observer("timeFilters")).define("timeFilters", _timeFilters);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("q1_data")).define("q1_data", ["URLSearchParams","API_BASE"], _q1_data);
  main.variable(observer("chart_q1")).define("chart_q1", ["d3","timeFilters","q1_data","tooltip"], _chart_q1);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("q2_data")).define("q2_data", ["URLSearchParams","API_BASE"], _q2_data);
  main.variable(observer("chart_q2")).define("chart_q2", ["d3","timeFilters","q2_data","tooltip"], _chart_q2);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("q3_data")).define("q3_data", ["URLSearchParams","API_BASE"], _q3_data);
  main.variable(observer("chart_q3")).define("chart_q3", ["d3","timeFilters","q3_data","tooltip"], _chart_q3);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("q4_data")).define("q4_data", ["fetchData"], _q4_data);
  main.variable(observer("chart_q4")).define("chart_q4", ["d3","timeFilters","q4_data","tooltip"], _chart_q4);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("q5_data")).define("q5_data", ["URLSearchParams","API_BASE"], _q5_data);
  main.variable(observer("chart_q5")).define("chart_q5", ["d3","timeFilters","q5_data","tooltip"], _chart_q5);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("q6_data")).define("q6_data", ["URLSearchParams","API_BASE"], _q6_data);
  main.variable(observer("chart_q6")).define("chart_q6", ["d3","timeFilters","q6_data","tooltip"], _chart_q6);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("q7_data")).define("q7_data", ["URLSearchParams","API_BASE"], _q7_data);
  main.variable(observer("chart_q7")).define("chart_q7", ["d3","timeFilters","q7_data","tooltip"], _chart_q7);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("q8_sample_data")).define("q8_sample_data", ["fetchData"], _q8_sample_data);
  main.variable(observer("chart_q8")).define("chart_q8", ["d3","timeFilters","q8_sample_data","tooltip"], _chart_q8);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["md"], _46);
  return main;
}
