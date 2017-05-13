#! /bin/bash
if [ "$DISABLE_AUTO_PILOT" = "0"  ]
then
    cd /root/deployment/auto_pilot
    ant test_ap &
fi

if [ "$DISABLE_LATE_DELIVERABLES_TRACKER" = "0"  ]
then
    cd /root/deployment/late_deliverables_tracker
    ant test_ldt &
fi

if [ "$DISABLE_REVIEW_ASSIGNMENT" = "0"  ]
then
    cd /root/deployment/review_assignment
    ant test_ra &
fi

if [ "$DISABLE_ONLINE_REVIEW" = "0"  ]
then
    cd /root/deployment/jboss-4.0.2
    bin/run.sh -b 0.0.0.0 &
fi

tail -f /dev/null & wait ${!}
