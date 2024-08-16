import React, { useEffect, useState } from 'react';
import { getFormattedDate, getJobTitleAndInfo } from '../utils/jobBoardUtils';
import '../styles/jobBoard.css';

//api call1 - https://hacker-news.firebaseio.com/v0/jobstories.json
//api call 2- https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty

const SIZE = 9;

function JobBoard() {
  const [remainingIds, setRemainingIds] = useState([]);
  const [jobsData, setJobsData] = useState([]);

  const getData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log("Error!: ", err);
    }
  }

  const fetchJobsData = async (ids) => {
    const jobsPromises = ids.map((id) => {
      const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
      return getData(url);
    });

    const jobs = await Promise.all(jobsPromises);
    if (jobs?.length) {
      const jobsToAdd = jobs.map((job) => {
        const { title, info } = getJobTitleAndInfo(job.title);
        const obj = {
          jobTitle: title,
          jobInfo: info,
          datePosted: getFormattedDate(job.time),
          url: job.url || `https://news.ycombinator.com/item?id=${job.id}`
        };
        return obj;
      });

      setJobsData([...jobsData, ...jobsToAdd]);
    }
  }

  const handleLoadMore = () => {
    const copyIds = [...remainingIds];
    if (copyIds?.length > 0) {
      const idsToLoad = copyIds.splice(0, SIZE);
      setRemainingIds(idsToLoad);
      fetchJobsData(idsToLoad);
    }
  }

  useEffect(() => {
    const fetchJobIds = async () => {
      const url = 'https://hacker-news.firebaseio.com/v0/jobstories.json';
      const data = await getData(url);
      const idsToLoad = data.splice(0, SIZE);
      setRemainingIds(data);
      fetchJobsData(idsToLoad);
    }

    fetchJobIds();
  }, []);

  return (
    <div className="job-board" style={{'text-align': 'center'}}>
      <h1>Job Board</h1>
      <div className="job-cards">
        {
          jobsData.length === 0
            ? <div>Loading...</div>
            : jobsData.map((jobData) => {
              return (
                <a href={jobData.url} target='_blank' className='card'>
                  <div className="company-info">{jobData.jobTitle}</div>
                  <div className="hiring-info">{jobData.jobInfo}</div>
                  <div className="date-posted">{jobData.datePosted}</div>
                </a>
              )
            })
        }
      </div>
      <button className='loadmore-btn' onClick={handleLoadMore}>Load More</button>
    </div>
  )
}

export default JobBoard