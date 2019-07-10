# Transit Dashboard

This repo contains projects related to showing a transit dashboard.

The goal is to create a transit dashboard consisting of:
* A microcontroller-powered e-ink display to show upcoming transit departures which it fetches from a data source via wifi or bluetooth
* A data source which fetches transit information to relay to the microcontroller

## Transit API

This directory contains a simple node API which returns the necessary transit information to be consumed by the microcontroller for display.