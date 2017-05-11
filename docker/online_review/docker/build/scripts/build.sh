#! /bin/bash

rm -rf /root/deployment

if [ "$DISABLE_ONLINE_REVIEW" = "0"  ]
then
    root/scripts/build-online-review.sh
fi

if [ "$DISABLE_AUTO_PILOT" = "0"  ]
then
    /root/scripts/build-auto-pilot.sh
fi

if [ "$DISABLE_LATE_DELIVERABLE_TRACKER" = "0"  ]
then
    /root/scripts/build-late-deliverables-tracker.sh
fi

if [ "$DISABLE_REVIEW_ASSIGNMENT" = "0"  ]
then
    /root/scripts/build-review-assignment.sh
fi