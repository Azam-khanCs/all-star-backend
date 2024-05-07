// routes/index.ts
import express from 'express';
import userRoutes from './userRoutes';
import instructorRoutes from './instructorRoutes';
import studentRoutes from './studentRoute';
import packageRoutes from './packageRoutes';
import lessonRoutes from './lessonRoutes';
import privateLessonRoutes from './privateLessonRoutes';
import studnetPaymentRoutes from './studnetPaymentRoutes';
import rateRoutes from './rateRoutes';
import instructorPaymentRoutes from './instructorPaymentRoutes';
import assignRoutes from './assignRoutes';

const router = express.Router();

// Mount user routes under '/user'
router.use('/user', userRoutes);
// Mount room routes under '/room'
router.use('/instructor', instructorRoutes);
// Mount reservation routes under '/room'
router.use('/student', studentRoutes);

router.use('/package', packageRoutes);

router.use('/lesson', lessonRoutes);

router.use('/privateLesson', privateLessonRoutes);

router.use('/studnetPayment', studnetPaymentRoutes);

router.use('/rate', rateRoutes);

router.use('/instructorPayment', instructorPaymentRoutes);

router.use('/assign', assignRoutes);

export default router;
