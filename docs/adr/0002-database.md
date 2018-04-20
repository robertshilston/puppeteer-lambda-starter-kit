# 2. Database selection

Date: 2018-04-20

## Status

In progress

## Context

We need to store records of audits so that we can report
against them.  

A few options are available:
 - RDS: Dismissed, as this isn't serverless and has hourly costs
 - DynamoDB: Trialled, but rejected as it's not optimised for 
   querying across all rows (a SCAN, in DynamoDB terms).  
 - Athena: AWS tool for querying JSON in S3.  Note that this 
   doesn't support full JSON, and throws errors on unusual
   characters in key names etc.

## Decision

Athena?

## Consequences


